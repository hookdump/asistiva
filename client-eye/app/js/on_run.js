'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, $log, $state, AppSettings) {

	$rootScope.$on('$stateChangeStart', function(evt, to, params) {
		if (to.redirectTo) {
			evt.preventDefault();
			$state.go(to.redirectTo, params);
		}
	});

	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.pageTitle = '';
		if ( toState.title ) {
			$rootScope.pageTitle += toState.title;
		}
		$log.info(fromState.name + ' -> ' + toState.name);

		$rootScope.currentState = toState.name;
		$rootScope.previousState = fromState.name;
		$rootScope.curUrl = toState.url;
		$rootScope.dateFormat = 'yyyy-MM-dd';
	});

}

module.exports = OnRun;
