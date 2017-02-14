// server.js

// BASE SETUP
// =============================================================================
var colors     = require('colors');
var path       = require('path');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var compress   = require('compression');
var config     = require('../config');

var http        = require('http').Server(app);
var io          = require('socket.io')(http);

console.log(('Initializing ' + config.project_name).green);

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('etag');

var env = process.env.NODE_ENV || 'development';
var env_config = config.envs[env];

var port = 3005; // process.env.PORT || env_config.port || 3000;        // set our port

var db_config = env_config.db;
console.log('Environment: ' + env.red);


// ROUTES FOR OUR API
// =============================================================================
var apiRouter = express.Router();
apiRouter.get('/', function(req, res) { res.json({ success: true });   });
apiRouter.get('/*', function(req, res) { res.json({ success: false, error: 'Invalid API route' });   });
app.use('/api', apiRouter);
app.use(express.static('build'));
app.use('/files', express.static('uploads'));

app.get('/api/restricted', function (req, res) {
	console.log('user ' + req.user.email + ' is calling /api/restricted');
	res.json({
		name: 'foo'
	});
});

app.get('/ping', function(req, res) {
	res.sendStatus(200);
});

// Catch all route, to send route requests to Angular
app.get('/*', function(req, res) {
	if (req.xhr) {
		console.log('Error 404: '.red + req.url);
		return res.status(404).send(req.url + ' not found');
	}

	if (req.url.indexOf(".") > -1) {
		console.log('Possible invalid route: '.red + req.url);
	}

	res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
});


process.on('exit', function() {

});

// START THE SERVER
// =============================================================================
// app.listen(port);
http.listen(port, function() {
  console.log('Listening on port ' + port);
});
