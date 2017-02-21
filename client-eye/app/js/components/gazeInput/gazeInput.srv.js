'use strict';
var servicesModule = require('./../../_load.srv.js');

/**
 * @ngInject
 */
function GazeInput($document, $rootScope, $window) {
  var $ = $window.jQuery;
  var Math = $window.Math;
  var MAX_VALID_X = 10000;
  var MAX_VALID_Y = 10000;

  // Gaze = Current input position
  // Cursor = Virtual cursor (follows the Gaze position smoothly)

  var service = {
    maxX: null,         maxY: null,
    gazeX: null,        gazeY: null,
    offsetX: null,      offsetY: null,
    cursorX: 0,         cursorY: 0,
    lastValidGazeX: 0,  lastValidGazeY: 0,
    cursorInterval: null,
    cursorFollowSteps: 5,
    cursorFollowInterval: 25
  };

  service.initWorkspace = function(workspaceElement) {
    // TODO: Update on window resize
    service.maxX = workspaceElement.width();
    service.maxY = workspaceElement.height();
    service.offsetX = workspaceElement.offset().left;
    service.offsetY = workspaceElement.offset().top;
    console.log('Workspace element initialized!', service);
  };

  // Update gaze position
  service.moveGaze = function(x,y) {
    service.gazeX = x;
    service.gazeY = y;
  };

  // Activate elements below cursor
  service.reactGaze = function(x,y) {

    // Get element under cursor
    var elem = document.elementFromPoint(x, y);
    var $elem = $(elem);

    if (!$elem.hasClass("activable")) {
      $elem = $elem.parents(".activable");
    }

    if ($elem.hasClass("activable")) {

      // already active!!
      if ($elem.hasClass("active")) return false;

      // deactivate everything
      $('.active').each(function(index, el) {
        $(el).removeClass('active');
        console.log('LEAVING', $(el));
        $(el).trigger("gaze_leave");
      });

      // activate this one
      $elem.addClass('active');
      $elem.trigger("gaze_enter");
      $rootScope.$emit('gazeCursor.animate');

    } else {

      // deactivate everything
      $('.active').each(function(index, el) {
        $(el).removeClass('active');
      });

    }

  };

  service.cursorX = 0;
  service.cursorY = 0;
  service.lastCursor = {x: 0, y: 0};
  $("#gazeCursor").css({left: service.cursorX, top: service.cursorY});

  service.cursorInterval = setInterval(function() {

    if (service.gazeX < -MAX_VALID_X || service.gazeY < -MAX_VALID_Y || service.gazeX > MAX_VALID_X || service.gazeY > MAX_VALID_Y) {
      // Invalid gaze! Restore last valid one!
      console.log('restoring last valid gaze');
      service.gazeX = service.lastValidGazeX;
      service.gazeY = service.lastValidGazeY;
    } else {
      // Valid gaze. Remember it for next time!
      service.lastValidGazeX = service.gazeX;
      service.lastValidGazeY = service.gazeY;
    }

    // ZENO'S PARADOX
    service.cursorX += ( service.gazeX - service.cursorX ) / service.cursorFollowSteps;
    service.cursorY += ( service.gazeY - service.cursorY ) / service.cursorFollowSteps;

    service.cursorX = Math.round(service.cursorX);
    service.cursorY = Math.round(service.cursorY);

    if (service.cursorX !== service.lastCursor.x || service.cursorY !== service.lastCursor.y) {

      // Move visual display of Cursor
      // $rootScope.$broadcast('cursor', [service.cursorX, service.cursorY]);
      $("#gazeCursor").css({left: service.cursorX, top: service.cursorY});

      // Affect the element below the Cursor
      service.reactGaze(service.cursorX + service.offsetX, service.cursorY + service.offsetY);

      service.lastCursor.x = service.cursorX;
      service.lastCursor.y = service.cursorY;
    }

  }, service.cursorFollowInterval);

  return service;
}

servicesModule.service('GazeInput', ['$document', '$rootScope', '$window', GazeInput]);
