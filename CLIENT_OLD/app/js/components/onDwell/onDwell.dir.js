'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var onDwell = function($timeout, $log) {
  return {
    restrict: 'A',
    scope: {
      dwellTrigger: '&',
      dwellData: '='
    },
    link: function(scope, element, attrs) {
      var counter = 0;
      var timeoutId = null;
      var increment = 0;
      var DWELL_COUNTER_THRESHOLD = 5;
      var DWELL_INTERVAL = 100;

      element.addClass('activable');

      var trigger = () => {
        console.log('trigger', scope.dwellData);
        element.removeClass('activating').removeClass('deactivating'); // .addClass('trigger');
        if (scope.dwellTrigger()) {
          scope.dwellTrigger()(scope.dwellData);
        } else {
          $log.error('No dwell trigger defined!');
        }

        try {
          scope.$apply();
        } catch(err) {
          $log.error('Cannot $apply!', err);
        }
      };

  		var stopInterval = () => {
        element.removeClass('activating').removeClass('deactivating');
  			clearInterval(timeoutId);
  			timeoutId = null;
  		};

  		var startInterval = () => {
        element.addClass('activating').removeClass('deactivating');
  			timeoutId = setInterval(function() {
  				// Increment + show number
  				counter += increment;
  				element.attr('counter', counter);

          element.find('.counter').text(counter); // just for displaying

  				if (counter > DWELL_COUNTER_THRESHOLD && increment === 1) { // 1 second!
    				// Increasing and I'm at the limit
  					counter = 0;
  					stopInterval();
            trigger();

  				} else if (counter < 0 && increment < 0) {
  					// Decreasing and I'm at the limit
            counter = 0;
  					element.attr('counter', '');
            element.removeClass('activating').removeClass('deactivating');
  					stopInterval();
  				}
  			}, DWELL_INTERVAL);
  		};


      element.on('gaze_enter', (ev) => {
        increment = 1;
        if (!timeoutId) {
          startInterval();
        }
      });

      element.on('gaze_leave', (ev) => {
        element.removeClass('activating').addClass('deactivating');
        increment = -1;
      });

    }
  };
};

directivesModule.directive('onDwell', onDwell);
