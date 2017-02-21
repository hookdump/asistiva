'use strict';
var directivesModule = require('./../../../_load.dir.js');

/**
 * @ngInject
 */
var keyboard = function(GazeInput, $log) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'example/keyboard/keyboard.html',
    link: function(scope, element, attrs) {
      $log.info('linking keyboard...');
      var letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM,.'];
      letters.forEach((row, index) => {
        var split = row.split('');
        letters[index] = _.map(split, (letter) => {
          return {
            text: letter,
            type: 'letter'
          };
        });
      });

      // repeat
      letters[1].push({
        type: 'custom',
        icon: 'repeat'
      });

      // repeat
      letters[2].push({
        type: 'custom',
        icon: 'remove'
      });

      console.log(letters);

      scope.rows = letters;
    }
  };
};

directivesModule.directive('keyboard', keyboard);
