'use strict';
var controllersModule = require('./../../_load.ctl');

/**
 * @ngInject
 */
function ExampleCtrl($scope, mySocket) {
  /*
  mySocket.on('note', function(payload) {
    $scope.keys[payload.note].active = payload.active;
  });

  mySocket.on('chord', function(payload) {
    console.log('chord', payload);
    $scope.chord = payload;
  });
  */
}

controllersModule.controller('ExampleCtrl', ExampleCtrl);
