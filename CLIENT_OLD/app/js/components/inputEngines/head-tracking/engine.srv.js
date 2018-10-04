'use strict';
var servicesModule = require('./../../../_load.srv.js');

/**
 * @ngInject
 */
function INPUT_head_tracking(GazeInput, $rootScope) {
  var service = {

    BUFFER_SIZE: 4,
    STABILITY_THRESHOLD: 0.3,
    MOVEMENT_MULTIPLIER: 80,
    MOVEMENT_THRESHOLD: 0.1,

    // x, y, z buffers
    buffers: [[], [], []],
    avg: [],
    delta: [0,0,0],
    computingAverage: true,

    gaze: [0,0],
    increment: [0,0],

    stabilityCounter: 0,
    stabilized: false,


    init: (workspaceEl) => {
      console.log('Head Tracking input initialized!');
      service.gaze = [GazeInput.maxX / 2 , (GazeInput.maxY / 2) + 100];
      service.triggerGazeInput();
      // var surfaceX = (x - GazeInput.offsetX) / GazeInput.maxX;
      // var surfaceY = (1 - y + GazeInput.offsetY) / GazeInput.maxY;
    },

    triggerGazeInput: () => {
      GazeInput.moveGaze(service.gaze[0], service.gaze[1]);
    },

    moveHead: (x,y,z) => {

      // Push head tracking data to buffer
      var currentHeadPos = [x,y,z];
      service.buffers.push(currentHeadPos);

      // Got enough buffer, let's process
      if (service.buffers.length >= service.BUFFER_SIZE) {

        // We are not moving the cursor. Just computing average.
        if (service.computingAverage) {
          service.avg = [0,0,0];
          var len = service.buffers.length;
          var deltaSum = 0;
          for (var i=0; i < len; i++) {
            for (var coord=0; coord < 3; coord++) {
              service.avg[coord] += service.buffers[i][coord];
            }
          }

          console.log('avg', service.avg[0], service.avg[1]);
        }

        for (var coord=0; coord < 3; coord++) {
          service.avg[coord] = (service.avg[coord] / len);
          service.delta[coord] = (currentHeadPos[coord] - service.avg[coord]).toFixed(3);

          // only use X and Y for deltaSum
          if (coord < 2) deltaSum += Math.abs(service.delta[coord]);
        }

        if (deltaSum < service.STABILITY_THRESHOLD) {
          service.stabilityCounter++;
        } else {
          service.stabilityCounter = 0;
          // service.computingAverage = false;
        }

        if (service.stabilityCounter > 30) {
          // console.log('STABILITY!');
          service.stabilized = true;
          service.computingAverage = true;
          service.increment[0] = 0;
          service.increment[1] = 0; // stop moving the cursor!
        } else {
          service.stabilized = false;
        }

        console.log('delta', service.delta[0], service.delta[1]);

        if (!service.computingAverage) {
          // ACTUAL MOVEMENT TRIGGER
          // only iterate through X and Y
          var d, val, base, modif;
          for (var coord=0; coord < 2; coord++) {
            d = service.delta[coord];

            if (Math.abs(d) > service.MOVEMENT_THRESHOLD) {
              base = Math.abs(d) * service.MOVEMENT_MULTIPLIER;
              val = d < 0 ? -base : base;
              modif = coord == 0 ? 1 : -1; // invert Y
              service.increment[coord] = val * modif;
            } else {
              service.increment[coord] = 0;
            }
          }
        }

        service.gaze[0] += service.increment[0];
        service.gaze[1] += service.increment[1];

        if (service.gaze[0] > GazeInput.maxX - 30)  { service.gaze[0] = GazeInput.maxX - 30; }
        if (service.gaze[0] < 30)                   { service.gaze[0] = 30; }
        if (service.gaze[1] > GazeInput.maxY - 30)  { service.gaze[1] = GazeInput.maxY - 30; }
        if (service.gaze[1] < 30)                   { service.gaze[1] = 30; }
        service.triggerGazeInput();

        // GazeInput.moveGaze(clean[0], clean[1]);
        // console.log(service.delta);

        $rootScope.$emit('headTracking', {
          x: service.delta[0],
          y: service.delta[1],
          z: service.delta[2],
          s: service.stabilized
        });

      }

      // Delete the oldest buffer frame
      service.buffers.shift();

    }
  };

  return service;
}

servicesModule.service('INPUT_head_tracking', INPUT_head_tracking);
