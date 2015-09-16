// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-21 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angucomplete-alt/angucomplete-alt.js',
      'bower_components/angular-filter/dist/angular-filter.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-permission/dist/angular-permission.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/ng-jcrop/ng-jcrop.js',
      'bower_components/ngDialog/js/ngDialog.js',
      'bower_components/toastr/toastr.js',
      // endbower
      'app/scripts/app.js',
      'app/scripts/auth/auth.module.js',
      'app/scripts/auth/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sinon',
      "karma-mocha-reporter",
      'karma-sinon-chai'
    ],
    reporters: [
      'mocha'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
