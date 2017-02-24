'use strict';
var directivesModule = require('./../../../_load.dir.js');

/**
 * @ngInject
 */
var headTrackingCursor = function($rootScope, INPUT_head_tracking) {
  return {
    restrict: 'E',
    templateUrl: 'inputEngines/head-tracking/cursor.html',
    link: function(scope, element, attrs) {
      $rootScope.$on('headTracking', (event, data) => {
        scope.deltaX = data.x;
        scope.deltaY = data.y;
        scope.deltaZ = data.z;
        scope.stabilized = data.s;
        scope.$apply();
      });
    }
  };
};

directivesModule.directive('headTrackingCursor', headTrackingCursor);
