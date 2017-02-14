'use strict';

var config = require('../config');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src([config.scripts.src, '!app/js/templates.js'])
    .pipe(jshint({
			unused: false,
			curly: false,
			globals: {
				_: true,
				angular: true
			}
		}))
    .pipe(jshint.reporter('jshint-stylish'));
});
