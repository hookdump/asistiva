'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');

gulp.task('styles', function () {

	var onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Building styles",
			message:  "Error: <%= error.message %>",
			sound:    "Beep"
		})(err);

		this.emit('end');
	};

	return gulp.src(config.styles.src)
	.pipe(plumber({errorHandler: onError}))
	.pipe(sass({
		sourceComments: global.isProd ? 'none' : 'map',
		sourceMap: 'sass',
		// indentedSyntax: true,
		outputStyle: global.isProd ? 'compressed' : 'nested'
	}))
	.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
	.pipe(gulp.dest(config.styles.dest))
	.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })))
	.pipe(notify({
		title: 'Gulp',
		subtitle: 'Building styles',
		message: 'Success!',
		sound: "Pop"
	}));

});
