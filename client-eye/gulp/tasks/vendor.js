'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');

gulp.task('vendor', function () {
  return gulp.src(config.vendor.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.vendor.dest));
});

