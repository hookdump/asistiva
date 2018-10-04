'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = window.angular.module('app.filters', []);
bulk(__dirname, ['./components/**/?(*.*)+(*.filter)?(*.*).js']);
