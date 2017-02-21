'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var gazeCursor = function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'gazeCursor/gazeCursor.html',
    link: function(scope, element, attrs) {
      scope.gazeAnimationEl = element.find('.gazeAnimation');
      $rootScope.$on('gazeCursor.animate', () => {
        scope.gazeAnimationEl.removeClass('animate');
        void scope.gazeAnimationEl[0].offsetWidth; // hack for resetting anim.
        scope.gazeAnimationEl.addClass('animate');
      });
    }
  };
};

directivesModule.directive('gazeCursor', gazeCursor);
