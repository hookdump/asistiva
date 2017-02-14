'use strict'
var connector = {};

connector = {
  init: function(config) {
    var self = this;
    log.io('Initializing IO Connector...');
    self.io_server = require('http').createServer(config.handlers.middleware);
    self.io = require('socket.io')(self.io_server);
    self.io_socket = null;

    log.io('Waiting for socket connections on port 8001');
    self.io_server.listen(8001);

    self.io.on('connection', function (socket) {
      log.io('A client connected to us!');
      self.io_socket = socket;
      self.io_socket.emit('hello', { foo: "bar" });
    });

  },
  cleanup: function(cb) {
    log.cleanup('IO Connector');
    this.io_server.close(cb);
  }
};

module.exports = connector;
