'use strict';

var log = require('../scripts/log');
var config = require('./config.js');
var async = require('async');

var server = {};
server.predictor = require('./predictor');
server.connector_io = require('./connector_io');
server.connector_zmq = require('./connector_zmq');
server.handlers = require('./handlers');

server.init = function() {
  var self = this;
  log.green('Initializing servers...');
  self.predictor.init(config),
  self.handlers.init({predictor: self.predictor, config: config}),
  self.connector_io.init({handlers: self.handlers, config: config}),
  self.connector_zmq.init({connector_io: self.connector_io}, function() {
    log.green('--- Up and running ---')
  });
};


process.on('SIGINT', function() {

  console.log("");
  log.warn('Starting clean up...');
  async.series([
    function(cb) {
      server.connector_zmq.cleanup(function(err) {
        if (err) log.error('ZMQ Connector cleanup', err);
        cb(err);
      });
    },
    function(cb) {
      server.connector_io.cleanup(function(err) {
        if (err) log.error('IO Connector cleanup', err); 
        cb(err);
      });
    },
    function(cb) {
      server.predictor.cleanup(function(err) {
        if (err) log.error('Predictor cleanup', err); 
        cb(err);
      });
    }
  ], function(err) {
    if (err) {
      log.error('Cleanup Callback', err);
    }

    log.info('Clean up finished!');
  });

});

module.exports = server;
