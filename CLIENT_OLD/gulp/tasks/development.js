'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};
  global.isProd = false;
  runSequence(['styles', 'images', 'fonts', 'views', 'vendor', 'lint', 'browserify'], 'watch', cb);

});
