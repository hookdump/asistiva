'use strict';
var bulk = require('bulk-require');

var configModule = (function () {
	var instance;
	return {
		get: function () {
			if (!instance) instance = {};
			return instance;
		}
	};
})();
module.exports = configModule;

bulk(__dirname, ['./components/**/component.config.js']);
