'use strict';

require('angular');

// angular modules
require('angular-ui-router');
require('restangular');
require('angular-bootstrap');
require('angular-cookies');
require('angular-sanitize');
require('angular-animate');
require('angular-socket-io');

require('./templates');
require('./_load.ctl');
require('./_load.srv');
require('./_load.dir');
require('./_load.filters');
require('./_load.config');


// create and bootstrap application
angular.element(document).ready(function() {


	var requires = [
		'ui.router',
		'ui.bootstrap',
		'ngSanitize',
		'ngCookies',
    'btford.socket-io',
		'restangular',
		'templates',
		'ngAnimate',
		'app.controllers',
		'app.services',
		'app.directives',
		'app.filters'
	];

	// mount on window for testing
	var app = angular.module('app', requires);
	window.app = app;
  window.angular = angular;

	angular.module('app').constant('AppSettings', require('./constants'));
	angular.module('app').config(require('./on_config'));
	angular.module('app').run(require('./on_run'));

  angular.module('app').factory('mySocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost:8001');
    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });
    return mySocket;
  });

	angular.module('app').config(function(RestangularProvider) {

		// Configure base API url
		RestangularProvider.setBaseUrl('/api');

		// Specify ID field
		RestangularProvider.setRestangularFields({
			id: "_id"
		});

    RestangularProvider.setDefaultHttpFields({cache: false});

		// Unwrap API responses
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			var extractedData;
			extractedData = data.data || [];
			return extractedData;
		});
	});

	angular.module('app').run(['$location', '$rootScope', function($location, $rootScope) {
		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
			$rootScope.previousState = from.name;
			$rootScope.state = to.name;
		});
	}]);

	angular.bootstrap(document, ['app']);

});
