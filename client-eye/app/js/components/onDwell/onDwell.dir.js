'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var onDwell = function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var counter = 0;
      var timeoutId = null;
      var increment = 0;
      var DWELL_THRESHOLD = 5;

      var activate = () => {
        console.log('activate!');
      };

  		var stopInterval = () => {
  			clearInterval(timeoutId);
  			timeoutId = null;
  		};

  		var startInterval = () => {
  			timeoutId = setInterval(function() {

  				// Increment + show number
  				counter += increment;
  				element.attr('counter', counter);

  				// Increasing and I'm at the limit
  				if (counter > DWELL_THRESHOLD && increment === 1) { // 1 second!
  					counter = 0;
  					stopInterval();
  					activate();

  					// Decreasing and I'm at the limit
  				} else if (counter < 1 && increment === -1) {
  					element.attr('counter', '');
  					stopInterval();
  				}
  			}, 100);
  		};


      element.on('gaze_enter', (ev) => {
        increment = 1;
        if (!timeoutId) {
          startInterval();
        }
      });

      element.on('gaze_leave', (ev) => {
        increment = -1;
      });

    }
  };
};

directivesModule.directive('onDwell', onDwell);
