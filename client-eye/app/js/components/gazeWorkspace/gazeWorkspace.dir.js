'use strict';
var directivesModule = require('./../../_load.dir.js');

/**
 * @ngInject
 */
var gazeWorkspace = function(GazeInput, $injector, $log) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'gazeWorkspace/gazeWorkspace.html',
    link: function(scope, element, attrs) {
      // Init workspace
      scope.InputEngine = null;
      GazeInput.initWorkspace(element);

      // Init input engine

      var selectedEngine = attrs.inputEngine;
      var defaultEngine = "mouse";

      var loadEngine = (name, loadingDefault) => {
        try {
          scope.InputEngine = $injector.get("INPUT_" + name);
        } catch (err) {
          $log.error(`Input engine "${name}" could not be found!`);
          if (!loadingDefault) {
            $log.error(`Falling back to "${defaultEngine}"...`);
            loadEngine(defaultEngine, true);
          }
        }
      };

      loadEngine(selectedEngine, false);

      if (scope.InputEngine) {
        $log.info(`Input engine loaded! Initializing...`);
        element.addClass(`INPUT_${selectedEngine}`);
        scope.InputEngine.init();
      }
    }
  };
};

directivesModule.directive('gazeWorkspace', ['GazeInput', '$injector', '$log', gazeWorkspace]);
