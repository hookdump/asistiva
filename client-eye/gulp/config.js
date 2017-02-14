'use strict';

module.exports = {

  'serverport': 3005,

  'styles': {
    'src' : 'app/styles/**/*.sass',
    'dest': 'build/css'
  },

  'styles2': {
    'src' : 'app/js/**/*.sass',
    'dest': 'build/css'
  },

  'vendor': {
    'src' : 'app/vendor/**/*',
    'dest': 'build/vendor'
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'build/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': 'build/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
			'app/js/components/**/*.html'
    ],
    'src': ['app/js/components/**/*.html'],
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'build/**/*.{json,css,js}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : false
  }

};
