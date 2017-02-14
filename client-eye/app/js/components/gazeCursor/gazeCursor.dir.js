'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var gazeCursor = function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'gazeCursor/gazeCursor.html',
    link: function(scope, element, attrs) {
    }
  };
};

directivesModule.directive('gazeCursor', gazeCursor);
