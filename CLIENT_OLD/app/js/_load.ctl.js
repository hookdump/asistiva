'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = window.angular.module('app.controllers', []);
bulk(__dirname, ['./components/**/?(*.*)+(*.ctl)?(*.*).js']);
