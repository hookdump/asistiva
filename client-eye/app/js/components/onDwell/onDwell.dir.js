'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var onDwell = function($timeout) {
  return {
    restrict: 'A',
    scope: {
      onDwell: '&'
    },
    link: function(scope, element, attrs) {
      var counter = 0;
      var timeoutId = null;
      var increment = 0;
      var DWELL_THRESHOLD = 5;

      element.addClass('activable');

      var trigger = () => {
        console.log('TRIGGERED DWELL!');
        element.removeClass('activating').removeClass('deactivating').addClass('trigger');
        $timeout(() => {
          element.removeClass('trigger');
        }, 500);
      };

  		var stopInterval = () => {
        console.log('Stop interval');
        element.removeClass('activating').removeClass('deactivating');
  			clearInterval(timeoutId);
  			timeoutId = null;
  		};

  		var startInterval = () => {
        element.addClass('activating').removeClass('deactivating');
        console.log('Start interval');
  			timeoutId = setInterval(function() {

          element.find('.counter').text(counter);

  				// Increment + show number
  				counter += increment;
  				element.attr('counter', counter);
          console.log('counter:', counter);

  				// Increasing and I'm at the limit
  				if (counter > DWELL_THRESHOLD && increment === 1) { // 1 second!
  					counter = 0;
  					stopInterval();
            trigger();

  					// Decreasing and I'm at the limit
  				} else if (counter < 0 && increment < 0) {
            counter = 0;
  					element.attr('counter', '');
            element.removeClass('activating').removeClass('deactivating');
            console.log('CANCEL DWELL!');
  					stopInterval();
  				}
  			}, 100);
  		};


      element.on('gaze_enter', (ev) => {
        console.log('gaze enter!');
        increment = 1;
        if (!timeoutId) {
          startInterval();
        }
      });

      element.on('gaze_leave', (ev) => {
        console.log('gaze leave!');
        element.removeClass('activating').addClass('deactivating');
        increment = -1;
      });

    }
  };
};

directivesModule.directive('onDwell', onDwell);
