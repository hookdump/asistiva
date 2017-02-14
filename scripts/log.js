var colors  = require('colors');
var util    = require('util');

// Displays formatted log messages if global.beQuiet is not true
var log = {

  format: function(s)	{ 
    if (typeof(s) === 'object') {
      return util.inspect(s);
    } else {
      return s; 
    }
  },

  display: function(s) {
    if (!global.beQuiet) {
      console.log( s );
    }
  },

  error: function(context, c, desc) 	{ 
    var build = this.format(context).red;
    if (c) {
      var add = " (" + this.format(c).error + ")";
      build = "@ ".red + build + add.red;
    }
    if (desc) {
      build += ": " + this.format(desc).gray;
    }

    console.log( 'ERROR'.red.bold + build );
  }
  , warn:	function(s)	{ console.log(s.yellow); }
  , cleanup:	function(s)	{ s = "Cleaning up: " + s; console.log(s.yellow); }
  , start:	function(s)	{ s = "Starting: " + s; console.log(s.green); }
  , info:	function(s)	{ console.log(s.green); }
  , green:	function(s)	{ console.log(s.green); }
  , red:	function(s)	{ console.log(s.red); }
  , gray: function(s) { console.log(s.gray); }
  , zmq: function(s) { s = "[zmq] " + s; console.log(s.magenta); }
  , io: function(s) { s = "[io] " + s; console.log(s.yellow); }

};

global.log = log;
module.exports = log;
