'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = window.angular.module('app.directives', []);
bulk(__dirname, ['./components/**/?(*.*)+(*.dir)?(*.*).js']);
