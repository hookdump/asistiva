'use strict';

var configModule = require('./_load.config.js').get();

/**
 * @ngInject
 */

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);

	// Dynamic states
	var components = _.keys(configModule);
	components.forEach(function(component) {
		var states = configModule[component].states;
		states.forEach(function(state) {
			var conf = _.omit(state, ['name']);
			$stateProvider.state(state.name, conf);
		});
	});

	$urlRouterProvider.otherwise('/');
}

module.exports = OnConfig;
