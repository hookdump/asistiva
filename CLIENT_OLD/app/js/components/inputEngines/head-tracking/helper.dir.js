'use strict';
var directivesModule = require('./../../../_load.dir.js');

/**
 * @ngInject
 */
var headTrackingHelper = function($document, INPUT_head_tracking) {
  return {
    restrict: 'E',
    templateUrl: 'inputEngines/head-tracking/helper.html',
    link: function(scope, element, attrs) {

      var videoInput = element.find('.inputVideo')[0];
      var canvasInput = element.find('.inputCanvas')[0];
      scope.htracker = new headtrackr.Tracker();

      scope.stopTracking = () => {
        scope.htracker.stop();
        scope.htracker.stopStream();
      };

      scope.startTracking = () => {

        scope.htracker.init(videoInput, canvasInput);
        scope.htracker.start();

        $document[0].addEventListener('headtrackingEvent', function(event) {
          INPUT_head_tracking.moveHead(event.x, event.y, event.z);
        }, false);
      };

    }
  };
};

directivesModule.directive('headTrackingHelper', headTrackingHelper);
