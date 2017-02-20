'use strict';
var servicesModule = require('./../_load.srv.js');

/**
 * @ngInject
 */
function INPUT_mouse($document, $log, GazeInput) {
  var service = {
    init: (workspaceEl) => {
      $log.info('Mouse input initialized!', workspaceEl);
      workspaceEl.css({cursor: 'none'});
      workspaceEl.hide();

      $document.bind("mousemove.asistiva", function(event) {
        var x = event.pageX - GazeInput.offsetX;
        var y = event.pageY - GazeInput.offsetY;
        GazeInput.moveGaze(x,y);
      });
    }
  };
  return service;
}

servicesModule.service('INPUT_mouse', INPUT_mouse);
