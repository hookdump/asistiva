'use strict'
var mysql = require('mysql');
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

      var joined_words = '("' + params.words.join('","') + '")';
      var q = 'UPDATE `palabras` SET `freq2` = `freq2` - 1 WHERE palabra IN ' + joined_words + ';';
      return q;
      break;

    case 'findWord':
      if (!isPresent('word')) return null;
      if (!isType('word', 'string')) return null;

      var q = 'SELECT id, palabra, freq2 FROM palabras WHERE `palabra` = "' + params.word + '";';
      return q;
      break;

    case 'createWord':
      if (!isPresent('word')) return null;
      if (!isType('word', 'string')) return null;
      var q = 'INSERT INTO palabras (palabra, freq2, fixed) VALUES ("' + params.word + '", 2, 1);';
      return q;

      break;

    case 'updateWord':
      if (!isPresent('id')) return null;
      if (!isType('id', 'string')) return null;
      var q = 'UPDATE `palabras` SET `freq2` = `freq2` + 1 WHERE `id` = ' + params.id + ';';
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
  self.pool = mysql.createPool(config.mysql_config);
}

predictor.cancelWords = function(words, cb) {
	var self = this;
  var q = this.build_query('cancelWord', {words: words});
  self.run_query(q, cb);
};

predictor.useWord = function(word, cb) {
  var self = this;

  if (word == "" || word.length == 1) {
    return cb(null);
  }

  var q = self.build_query('findWord', {word: word});
  self.run_query(q, function(err, rows, fields) {

    if (!rows || rows.length == 0) {
      // create
      var q2 = self.build_query('createWord', word);
    } else {
      // update
      var myId = rows[0].id;
      var q2 = self.build_query('updateWord', myId);
    }

  	self.run_query(q2, function(err, rows, fields) {
      if (err) { console.log('ERROR:', err); }
      return cb(err);
    });
  });
};

predictor.predict = function(word, cb) {
	var self = this;
  var results = [];
  var myquery = 'SELECT palabra FROM palabras WHERE palabra LIKE "' + word + '%" ORDER BY freq2 DESC, freq DESC LIMIT 10;';
	self.run_query(myquery, function(err, rows, fields) {
    if (err) {
      console.log('error:', err);
      return cb(err, []);
    } else {
      rows.forEach(function(w) {
        results.push(w.palabra);
      });
      return cb(null, results);
    }
  });
};

predictor.cleanup = function(cb) {
  log.cleanup('Predictor');
  this.pool.end(cb);
}

module.exports = predictor;
