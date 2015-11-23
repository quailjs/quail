// Karma configuration for Quail unit tests

module.exports = function(karma) {
  karma.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'browserify'
    ],

    // list of files / patterns to load in the browser
    files: [
      // Fixtures
      'vendor/jquery/dist/*.js',
      'src/core/lib/*.js',
      // Specs
      'test/unit/*Spec.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'vendor/jquery/dist/*.js': [
        'browserify'
      ],
      'src/core/lib/*.js': [
        'browserify'
      ],
      'test/unit/*Spec.js': [
        'browserify'
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // the default configuration
    htmlReporter: {
      outputDir: 'karma_html',
      templatePath: __dirname + '/node_modules/karma-html-reporter/jasmine_template.html'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
    logLevel: karma.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'Chrome',
      // 'IE',
      //'Safari',
      //'Firefox',
      //'Opera',
      'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    autoWatch: false,

    browserify: {
      paths: [
        'src/core/lib/',
        'vendor/',
      ],
      debug: true,
      transform: [
        'brfs',
        'browserify-shim'
      ],
      configure: function(bundle) {
        bundle.once('prebundle', function() {
          bundle.transform('babelify');
        });
      }
    },
  });
};
