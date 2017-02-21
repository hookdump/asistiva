'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var dynamicResizer = function($window) {
  var angular = $window.angular;
  var $ = $window.jQuery;

  return {
    restrict: 'A',
    link: function(scope, elem) {

      scope.onResize = function() {
        var navbar = {
          height: 0
        };

        var current = {
          height: $window.innerHeight,
          width: $window.innerWidth,
        };
        current.ratio = current.width / current.height;

        var newDim = {
          height: null,
          width: null
        };

        var resizeType = $(elem).attr('dynamic-resizer');

        // TODO: Move sidebar offsets, etc. to optional parameters
        // TODO: Move resizing schemes to a config file
        if (resizeType === "ratio") {
          // Start maximizing Height, then adjust Width.
          newDim.height = current.height - navbar.height;
          newDim.width = Math.floor(newDim.height * 1.415); // 1020x800

          // Tall window? Start maximizing Width, then adjust Height.
          if (current.ratio < 1.275) {
            newDim.width = current.width - 0;
            newDim.height = Math.floor(newDim.width / 1.415);
          }
        } else if (resizeType === "full") { // new full screen trackers!
          newDim.width = current.width;
          newDim.height = current.height;
        } else if (resizeType === "h") {
          newDim.width = null;
          newDim.height = current.height - navbar.height;
        }

        if (newDim.height) {
          $(elem).height(newDim.height);
          if (resizeType === "h") {
            $(".sidebar").height(newDim.height);
          }
        }
        if (newDim.width) {
          $(elem).width(newDim.width);
        }

        // Set .row elements line-height = height
        // var rowH = $(elem).find('.row').height();
        // $(elem).find('.row').css('line-height', rowH + 'px');
      };

      scope.onResize();

      angular.element($window).bind('resize', function() {
        scope.onResize();
      });
    }
  };

};

directivesModule.directive('dynamicResizer', ['$window', dynamicResizer]);
