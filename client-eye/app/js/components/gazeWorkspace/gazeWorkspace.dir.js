'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var gazeWorkspace = function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'gazeWorkspace/gazeWorkspace.html',
    link: function(scope, element, attrs) {

    }
  };
};

directivesModule.directive('gazeWorkspace', gazeWorkspace);
