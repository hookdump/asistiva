// TODO: Testing service extending BaseGazeInput, forwarding mouse movements to GazeCursor

/*
'use strict';
var directivesModule = require('./_index.js');
*/

/**
 * @ngInject
 */
 /*
function followmouse($document, $window, SocketConnector, GazeCursor) {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // var el = element[0];
      var $ = jQuery;
      var $fluidTracker = $(".fluid-tracker");
      var enableTestMode = true;

      GazeCursor.maxX = $fluidTracker.width();
      GazeCursor.maxY = $fluidTracker.height();

      var off = $fluidTracker.offset();
      GazeCursor.offsetX = off.left;
      GazeCursor.offsetY = off.top;

      GazeCursor.navigate = function(url) {
        $window.location.href = url;
      };

      if (SocketConnector.status !== "connected") {
        if (enableTestMode) {
          GazeCursor.testMode = true;

          $document.bind("mousemove.asistiva", function(event) {
            var x = event.pageX;
            var y = event.pageY;
            GazeCursor.moveGaze(x,y);
          });
        }
      } else {
        GazeCursor.testMode = false;
      }

    }
  };

}

directivesModule.directive('followmouse', ['$document', '$window', 'SocketConnector', 'GazeCursor', followmouse]);
*/
