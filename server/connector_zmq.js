'use strict'
var zmq = require('zmq');

// TODO: Update to latest Pupil IPC structure

var connector = {};
connector = {
  init: function(config, cb) {
    var self = this;
    log.start('ZMQ Connector');
    self.connector_io = config.connector_io;
    self.pupil_addr = 'tcp://127.0.0.1:53736';
    self.ipc_addr = '';

    self.last_cmd = null;
    self.noop = function() {};
    self.response_cb = self.noop;

    self.send = function(cmd, cb) {
      log.zmq('Sending [' + cmd + ']');
      self.last_cmd = cmd;
      self.response_cb = cb;
      self.zmq_req.send(cmd);
    };

    // ZeroMQ setup
    self.zmq_req = zmq.socket('req');
    self.zmq_req.identity = 'client' + process.pid;

    // Register to monitoring events
    self.zmq_req.on('connect', function(fd, ep) {console.log('connect, endpoint:', ep);});
    self.zmq_req.on('accept', function(fd, ep) {console.log('accept, endpoint:', ep);});
    self.zmq_req.on('disconnect', function(fd, ep) {console.log('disconnect, endpoint:', ep);});
    self.zmq_req.on('listen', function(fd, ep) {console.log('listen, endpoint:', ep);});
    /*
    self.zmq_req.on('close', function(fd, ep) {console.log('close, endpoint:', ep);});
    self.zmq_req.on('connect_delay', function(fd, ep) {console.log('connect_delay, endpoint:', ep);});
    self.zmq_req.on('connect_retry', function(fd, ep) {console.log('connect_retry, endpoint:', ep);});
    self.zmq_req.on('bind_error', function(fd, ep) {console.log('bind_error, endpoint:', ep);});
    self.zmq_req.on('accept_error', function(fd, ep) {console.log('accept_error, endpoint:', ep);});
    self.zmq_req.on('close_error', function(fd, ep) {console.log('close_error, endpoint:', ep);});
    */

    self.zmq_req.on('monitor_error', function(err) {
      console.log('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
      // setTimeout(function() { socket.monitor(500, 0); }, 5000);
    });

    log.zmq('Connecting to ZMQ Responder (Pupil): ' + self.pupil_addr);
    self.zmq_req.monitor(500, 0);
    self.zmq_req.connect(self.pupil_addr);
    // self.zmq_req.subscribe('');
    log.zmq('Connected ZMQ! ' + self.pupil_addr);

    console.log('Requesting SUB port...');
    self.send('SUB_PORT', function(data) {
      console.log('Sent', data);
    });

    // log.gray('[io] Status?');
    // console.log(self.connector_io);


    self.zmq_req.on('message', function(payload) {
      var msg = payload.toString();
      log.gray('[zmq] Got data!');
      log.zmq(payload);

      if (self.last_cmd === 'SUB_PORT') {
        // 56992
        self.zmq_ipc = zmq.socket('sub');
        self.zmq_ipc.identity = 'ipc_client' + process.pid;

        log.gray('Got IPC SUB PORT:', payload);
        self.ipc_addr = 'tcp://127.0.0.1:' + payload;
        log.zmq('Connecting to ZMQ IPC (Pupil): ' + self.ipc_addr);
        self.zmq_ipc.monitor(500, 0);
        self.zmq_ipc.connect(self.ipc_addr);
        self.zmq_ipc.subscribe('surface');
        log.zmq('Connected to IPC! ' + self.ipc_addr);

        self.zmq_ipc.on('message', function(payload, data) {
          // log.gray('[IPC] DATA');
          log.zmq(data);

          this.zmq_ipc.close();
        });

      }
      /*
         (zmq) got some data!
         Pupil
confidence:1.0
norm_gaze:(0.59643612058543027, 0.43582119506652539)
apparent_pupil_size:79.2927474976
norm_pupil:(0.4599171161651611, 0.4549605051676432)
roi_center:(77.34695434570312, 78.21421813964844)
timestamp:6428.09282661
realtime gaze on Compu:(0.56826284681649475, 0.38502615617941355)

(zmq) got some data!
Event
name:Compu
timestamp:6428.11166475
m_from_screen:[[ 2.44059072  0.00453044 -0.78612705] [ 0.33407195  2.76009975 -0.9471855 ] [ 0.11697506  0.25677993  1. ]]
m_to_screen:[[ 0.4421694  -0.03281657  0.32291819] [-0.06801152  0.37298611  0.30546798] [-0.03822322 -0.09541854  1. ]]
type:marker_ref_surface
uid:1423944054.4
*/

      /*
      if (msg.length > 10) {
        var regex = /realtime gaze on Compu:\(([0-9\.]+), ([0-9\.]+)\)/;
        var result = msg.match(regex);

        if (result) {
          var x = result[1];
          var y = result[2];

          // get confidence
          var regex2 = /confidence:([0-9\.]+)/;
          var result2 = msg.match(regex2);
          var confidence = parseFloat(result2[1]).toFixed(2);
          var emitObj = { x: x, y: y, confidence: confidence };
          console.log('emit:', emitObj);

          if (connector_io.io_socket) {
            connector_io.io_socket.emit('gaze', emitObj);
          }

        }
      }
      */
      self.last_cmd = '';
    });
    return cb();
  },
  cleanup: function(cb) {
    log.cleanup('ZMQ Connector');
    if (this.zmq_ipc) this.zmq_ipc.close();
    if (this.zmq_req) {
      this.zmq_req.unmonitor();
      this.zmq_req.close();
    }
    cb();
  }
};

module.exports = connector;
