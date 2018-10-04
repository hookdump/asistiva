'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = window.angular.module('app.services', []);
bulk(__dirname, ['./components/**/?(*.*)+(*.srv)?(*.*).js']);
