'use strict';
var configModule = require('./../../_load.config').get();

var component = {
  model: 'example',
  baseState: 'example',
  mainState: 'example',
  controllers: {
    example: 'ExampleCtrl',
  },

  template: function(file) {  return component.model + '/' + file + '.html'; },
  state: function(name) {     return name ? component.baseState + "." + name : component.baseState; }
};

component.states = [{
  name: 'example',
  url: '/',
  templateUrl: component.template('example'),
  controller: component.controllers.example
}];

configModule[component.model] = component;
module.exports = component;
