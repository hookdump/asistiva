'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');

var onError = function(err) {
	notify.onError({
		title:    "Gulp",
		subtitle: "Building views",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
	})(err);

	this.emit('end');
};


// Views task
gulp.task('views', function() {

	// Put our index.html in the dist folder
	gulp.src('app/index.html')
	.pipe(plumber({errorHandler: onError}))
	.pipe(gulp.dest(config.dist.root));

	// Process any other view files from app/views
	return gulp.src(config.views.src)
	.pipe(templateCache({
		standalone: true
	}))
	.pipe(gulp.dest(config.views.dest))
	.pipe(notify({
		title: 'Gulp',
		subtitle: 'Building views',
		message: 'Success!',
		sound: "Pop"
	}));

});
