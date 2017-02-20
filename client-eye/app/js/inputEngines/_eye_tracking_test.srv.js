'use strict';
var servicesModule = require('./../_load.srv.js');

/**
 * @ngInject
 */
function INPUT_eye_tracking_test($document, $log, GazeInput) {
  // Eye-tracker simulator
  // Transforms mouse input into eye tracker format [0-1, 0-1]
  // For testing!
  var service = {
    mouseToEyeTracker: (x, y) => {
      var surfaceX = (x - GazeInput.offsetX) / GazeInput.maxX;
      var surfaceY = (1 - y + GazeInput.offsetY) / GazeInput.maxY;
      return [surfaceX, surfaceY];
    },
    eyeTrackerToGaze: (x, y) => {
      var gazeX = (x * GazeInput.maxX) + GazeInput.offsetX;
      var gazeY = GazeInput.offsetY - (y * GazeInput.maxY);
      return [gazeX, gazeY];
    },
    init: (workspaceEl) => {
      $log.info('Eye-tracking TEST input initialized!');
      workspaceEl.css({cursor: 'crosshair'});

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

servicesModule.service('INPUT_eye_tracking_test', INPUT_eye_tracking_test);
