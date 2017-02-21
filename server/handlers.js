'use strict'
var handlers = {};

handlers = {

  init: function(config) {
    handlers.predictor 				= config.predictor;
		handlers.responseHeaders 	= config.config.responseHeaders;
  },

  middleware: function(req, res) {

    if (req.url === "/predict" && req.method === "POST") {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        body = body.toLowerCase();
        handlers.predictor.predict(body, function(err, predictions) {
          res.writeHead(200, handlers.responseHeaders);
          res.end( JSON.stringify({data: predictions}));
        });
      });

    } else if (req.url === "/update" && req.method === "POST") {

      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        body = body.toLowerCase();
        handlers.predictor.useWord(body, function(err) {
          res.writeHead(200, handlers.responseHeaders);
          res.end();
        });
      });

    } else if (req.url === "/cancel" && req.method === "POST") {

      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {

        body = body.toLowerCase();
        var words = body.split("$");

        handlers.predictor.cancelWords(words, function(err) {
          res.writeHead(200, handlers.responseHeaders);
          res.end();
        });
      });

    }
  }

}

module.exports = handlers;
