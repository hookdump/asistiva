'use strict'
var psql = require('pg');
var Pool = require('pg').Pool;
var predictor = {};

predictor.build_query = function(query, params) {
	var self = this;
  var context = 'predictor.build_query';

  var isPresent = function(param) {
    if (!params[param]) {
      log.error(context, query, 'param "' + param + '" is required');
      return false;
    } else {
      return true;
    }
  }

  var isType = function(param, type) {
    if (typeof params[param] === type) {
      return true;
    } else {
      log.error(context, query, 'param "' + param + '" should have type "' + type + '"');
      return false;
    }
  }

  switch(query) {
    case 'cancelWord':
      if (!isPresent('words')) return null;
      if (!isType('words', 'array')) return null;

      var joined_words = '(\'' + params.words.join('\',\'') + '\')';
      var q = 'UPDATE words SET used = used - 1 WHERE word IN ' + joined_words + ';';
      return q;
      break;

    case 'findWord':
      if (!isPresent('word')) return null;
      if (!isType('word', 'string')) return null;
      var q = 'SELECT id, word FROM words WHERE word = \'' + params.word + '\';';
      return q;
      break;

    case 'createWord':
      if (!isPresent('word')) return null;
      if (!isType('word', 'string')) return null;
      var q = 'INSERT INTO words (word, used) VALUES (\'' + params.word + '\', 1);';
      return q;
      break;

    case 'updateWord':
      if (!isPresent('id')) return null;
      if (!isType('id', 'string')) return null;
      var q = 'UPDATE words SET used = used + 1 WHERE id = ' + params.id + ';';
      return q;
      break;

    default:
      log.error(context, 'No query type specified!');
      return null;
      break;
  };
};

predictor.run_query = function(query, cb) {
  var self = this;
  if (!query) {
    return cb(new Error('Cannot run an empty query!'));
  }

  self.pool.query(query, function(err, results) {
    if (err) {
      log.error('Error running SQL Query:', query);
      return cb(err);
    } else {
      return cb(null, results);
    }
  });
};

predictor.init = function (config) {
  var self = this;
  log.start('Predictor');
  self.pool = new Pool(config.psql_config);
}

predictor.cancelWords = function(words, cb) {
	var self = this;
  var q = this.build_query('cancelWord', {words: words});
  self.run_query(q, cb);
};

predictor.useWord = function(word, cb) {
  var self = this;
  var finalQuery = null;

  if (word == "" || word.length == 1) {
    return cb(null);
  }

  var q = self.build_query('findWord', {word: word});
  self.run_query(q, function(err, result, fields) {
    var rows = result.rows || [];

    if (!rows || rows.length == 0) {
      // create
      finalQuery = self.build_query('createWord', {word: word});
    } else {
      // update
      var myId = rows[0].id;
      finalQuery = self.build_query('updateWord', {id: myId.toString()});
    }

  	self.run_query(finalQuery, function(err, rows, fields) {
      if (err) { console.log('ERROR:', err); }
      return cb(err);
    });
  });
};

predictor.predict = function(word, cb) {
	var self = this;
  var predictions = [];
  var myquery = 'SELECT word FROM words WHERE word LIKE \'' + word + '%\' ORDER BY used DESC, rank ASC LIMIT 4;';
	self.run_query(myquery, function(err, result, fields) {
    if (err) {
      console.log('error:', err);
      return cb(err, []);
    } else {
      var rows = result.rows;
      rows.forEach(function(w) {
        predictions.push(w.word);
      });

      return cb(null, predictions);
    }
  });
};

predictor.cleanup = function(cb) {
  log.cleanup('Predictor');
  this.pool.end(cb);
}

module.exports = predictor;
