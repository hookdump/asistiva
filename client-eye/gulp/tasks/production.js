'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

	cb = cb || function() {};

	global.isProd = true;

	runSequence(['styles', 'images', 'fonts', 'views', 'vendor', 'browserify'], 'gzip', cb);
	//runSequence(['styles', 'images', 'fonts', 'views', 'vendor', 'browserify'], cb);

});
