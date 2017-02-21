'use strict';
var directivesModule = require('./../../../_load.dir.js');

/**
 * @ngInject
 */
var keyboard = function(GazeInput, PredictiveText, $log) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'example/keyboard/keyboard.html',
    link: function(scope, element, attrs) {

      scope.lastKey = null;
      scope.currentText = '';
      scope.currentWord = '';
      scope.startingNewWord = false; // the next letter will start a new word

      scope.predictions = [null, null];

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
        icon: 'repeat',
        action: 'repeat'
      });

      // backspace
      letters[2].push({
        type: 'custom',
        icon: 'remove',
        action: 'backspace'
      });

      scope.rows = letters;

      scope.selectWord = (word) => {
        if (!word) {
          return;
        }

        scope.currentText += ' ' + word;
        scope.currentWord = '';
        scope.startingNewWord = false;
      };

      scope.selectKey = (key) => {

        if (key.type === 'letter') {

          if ([',', '.'].indexOf(key.text) > -1) {
            // Punctuation
            scope.startingNewWord = true;
          } else {
            // Regular letters
            if (scope.startingNewWord) {
              scope.selectWord(scope.currentWord);
            }
          }

          scope.currentWord += key.text;
          scope.lastLetter = key.text;

        } else if (key.type === 'custom') {

          switch (key.action) {
            case 'backspace':
              scope.currentWord = scope.currentWord.slice(0, -1);
              scope.startingNewWord = false;
              break;

            case 'repeat':
              scope.selectKey(scope.lastKey);
              break;

            default:
              $log.error('A key triggered an unknown action: ' + key.action);
              break;
          }

        }

        // Remember this key to possibly repeat it, unless it's the REPEAT key.
        if (! (key.action && key.action === 'repeat')) {
          scope.lastKey = key;
        }

      };

    }
  };
};

directivesModule.directive('keyboard', keyboard);
