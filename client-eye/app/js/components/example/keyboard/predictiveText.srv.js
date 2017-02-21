'use strict';
var servicesModule = require('./../../../_load.srv.js');

/**
 * @ngInject
 */
function PredictiveText($http) {
  var service = {};

  service.useWord = function(w, cb) {
    if (w.length === 1) {
      if (cb) { return cb(null); } else { return false; }
    }

    $http.post("http://localhost:8001/update", w)
    .then(function(response) {
      return cb ? cb(null) : true;
    });

  };

  service.cancelWords = function(words, cb) {
    if (words.length < 1) {
      if (cb !== undefined) { return cb(null); } else { return; }
    }

    var str = "";
    words.forEach(function(w) {
      str += w + "$";
    });
    str = str.substring(0, str.length - 1);

    $http.post("http://localhost:8001/cancel", str)
    .then(function(response) {
      return cb ? cb(null) : true;
    });
  };

  service.getSuggestions = function(w, cb) {
    $http.post("http://localhost:8001/predict", w)
      .then(function(response) {
        if (response && response.data) {
          var words = response.data;
          return cb(words);
        } else {
          return cb([]);
        }
      });
  };

  return service;
}

servicesModule.service('PredictiveText', PredictiveText);
