'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var buffer      = require('vinyl-buffer');
var streamify   = require('gulp-streamify');
var watchify    = require('watchify');
var browserify  = require('browserify');
var babelify    = require('babelify');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var debowerify  = require('debowerify');
var ngAnnotate  = require('browserify-ngannotate');
var notify      = require('gulp-notify');
//var handleErrors = require('../util/handleErrors');

var onError = function(err) {
	notify.onError({
		title:    "Gulp",
		subtitle: "Building scripts",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
	})(err);

	this.emit('end');
};

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

	var bundler = browserify({
		entries: config.browserify.entries,
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}, watchify.args);

	if ( !global.isProd ) {
		bundler = watchify(bundler);
		bundler.on('update', function() {
			rebundle();
		});
	}

	var transforms = [
		babelify,
		debowerify,
		ngAnnotate,
		'brfs',
		'bulkify'
	];

	transforms.forEach(function(transform) {
		bundler.transform(transform);
	});

	function rebundle() {
		var stream = bundler.bundle();
		var createSourcemap = global.isProd && config.browserify.sourcemap;

		gutil.log('Rebundle...');

		return stream.on('error', onError)
		.pipe(source(file))
		.pipe(gulpif(createSourcemap, buffer()))
		.pipe(gulpif(createSourcemap, sourcemaps.init()))
		.pipe(gulpif(global.isProd, streamify(uglify({
			mangle: false,
			compress: false /*{ drop_console: true } */
		}))))
		.pipe(gulpif(createSourcemap, sourcemaps.write('./')))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })))
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'Building scripts',
			message: 'Success!',
			sound: "Pop"
		}));
	}

	return rebundle();

}

gulp.task('browserify', function() {

	return buildScript('main.js');

});
