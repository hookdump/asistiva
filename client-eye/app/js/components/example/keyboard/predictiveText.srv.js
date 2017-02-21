'use strict';
var servicesModule = require('./../../../_load.srv.js');

/**
 * @ngInject
 */
function PredictiveText($http) {
  var service = {};

  service.useWord = function(w, cb) {
    if (w.length === 1) {
      return new Promise().resolve(false);
    }
    return $http.post("http://localhost:8001/update", w);
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

  service.getSuggestions = function(words, cb) {
    return $http.post("http://localhost:8001/predict", words).then((result) => {
      if (result && result.data && result.data.data) {
        return result.data.data;
      } else {
        return [];
      }
    });
  };

  return service;
}

servicesModule.service('PredictiveText', PredictiveText);
