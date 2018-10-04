'use strict';
var servicesModule = require('./../../_load.srv.js');

/**
 * @ngInject
 */
function INPUT_eye_tracking($document, $log, GazeInput) {
  var service = {
    eyeTrackerToGaze: (x, y) => {
      var gazeX = (x * GazeInput.maxX) + GazeInput.offsetX;
      var gazeY = GazeInput.offsetY - (y * GazeInput.maxY);
      return [gazeX, gazeY];
    },
    init: () => {
      $log.info('Eye-tracking input initialized!');
      $document.bind("mousemove.asistiva", function(event) {
        var x = event.pageX - GazeInput.offsetX;
        var y = event.pageY - GazeInput.offsetY;
        var transform = service.mouseToEyeTracker(x,y);
        var clean = service.eyeTrackerToGaze(transform[0], transform[1]);
        GazeInput.moveGaze(clean[0], clean[1]);
      });
    }
  };
  return service;
}

servicesModule.service('INPUT_eye_tracking', INPUT_eye_tracking);

// TODO: Service extending BaseGazeInput, forwarding gaze data from socketIo to GazeCursor
/*
  console.log('subscribing to socket.io events...');
  SocketConnector.on('connection', function() {
    SocketConnector.status = "connected";
    console.log('io connection!');
    $document.unbind("mousemove.asistiva");
  });

  SocketConnector.on('disconnection', function() {
    SocketConnector.status = "disconnected";
    console.log('io disconnection!');
  });

  SocketConnector.on('gaze', function (data) {
    // console.log(data);
    // socket.emit('my other event', { my: 'data' });

    var relativeX = data.x;
    var relativeY = 1-data.y;

    if (service.maxX && service.maxY) {
      var gazeX = 20 + (relativeX * service.maxX) + service.offsetX;
      var gazeY = 20 + (relativeY * service.maxY) + service.offsetY;
      service.moveGaze(gazeX,gazeY);
    } else {
      console.log('I dont have the max coords');
    }

  });
  */
