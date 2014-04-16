/*! QUAIL quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  var buildId = (typeof process.env.TRAVIS_BUILD_ID !== 'undefined') ? process.env.TRAVIS_BUILD_ID : Date.now();
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('quail.json'),
    convert: {
      yml2json: {
        files: [
          {
            expand: true,
            cwd: 'src/resources/guidelines',
            src: ['*.yml'],
            dest: 'dist/guidelines/',
            ext: '.json'
          },
          {
            expand: true,
            cwd: 'src/resources',
            src: ['*.yml'],
            dest: 'dist/',
            ext: '.json'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= pkg.options.banner %>' + "\n" + ';(function($) {' + "\n",
        footer: "\n" + '})(jQuery);',
        stripBanners: true
      },
      dist: {
        src: ['src/js/core.js', 'src/js/components/*.js', 'src/js/strings/*.js', 'src/js/custom/*.js', 'src/js/lib/*.js'],
        dest: 'dist/quail.jquery.js'
      },
      test: {
        src: ['src/js/core.js', 'src/js/components/*.js', 'src/js/strings/*.js', 'src/js/custom/*.js', 'src/js/lib/*.js'],
        dest: 'test/quail-testing.jquery.js',
        options: {
          banner: '<%= pkg.options.banner %>' + "\n" + 'var __testQuail = {};(function($) {' + "\n",
          footer: "\n" + '__testQuail = quail; })(jQuery);',
          stripBanners: true
        }
      },
      testLib: {
        src: ['dist/tests.json', 'lib/jquery/jquery.js', 'lib/qunit/qunit.js', 'test/quail-testing.jquery.js', 'test/testrunner.js'],
        dest: 'test/quail-testrunner.js',
        options: {
          banner: '',
          footer: '',
          stripBanners: true,
          process: function(src, filepath) {
            if(filepath === 'dist/tests.json') {
              return 'var __quailTests = ' + src + ';' + "\n";
            }
            return src;
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/quail.jquery.min.js': 'dist/quail.jquery.js'
        }
      },
      options: {
        banner: '<%= pkg.options.banner %>'
      }
    },
    qunit: {
      all: ['test/unit/*', 'test/quail.html'],
      single: ['test/' + grunt.option('file')],
      unit: ['test/unit/*']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'src/**/*.js']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.yml', 'test/accessibility-tests/*.html', 'test/core/*.html', 'test/testrunner.js'],
        tasks: ['convert', 'concat', 'jshint', 'buildTestFilesJson', 'buildGuideline', 'uglify'],
        options: {
          spawn: false
        }
      }
    },
    buildGuideline: {
      dist: {
        files: [
          { guideline: '508', src: 'dist/tests.json', dest: 'dist/guidelines/508.tests.json' },
          { guideline: 'wcag', src: 'dist/tests.json', dest: 'dist/guidelines/wcag.tests.json' }
        ]
      }
    },
    compressTestsJson: {
      dist: {
        files: [
          { src: 'dist/tests.json', dest: 'dist/tests.min.json' }
        ]
      }
    },
    buildTestFilesJson: {
      dist: {
        files: [
          { src: 'test/accessibility-tests/*.html', dest: 'test/accessibility-tests/_tests.json' },
          { src: 'test/core/*.html', dest: 'test/core/_tests.json'}
        ]
      }
    },
    'gh-pages': {
      options: {
        base: '',
        repo: 'https://github.com/quailjs/quailjs.github.io.git',
        branch: 'master',
        add: true,
        message: 'Auto-generated commit from grunt gh-pages.'
      },
      src: ['dist/**', 'src/**']
    },
    connect: {
      server: {
        options: {
          port: 9999
        }
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          urls: ['http://127.0.0.1:9999/test/quail.html'],
          tunnelTimeout: 10,
          testTimeout: 900000000,
          concurrency: 3,
          detailedError: true,
          build: buildId,
          testname: buildId,
          tags: [
            process.env.TRAVIS_BRANCH,
            process.env.TRAVIS_COMMIT
          ],
          browsers: [
            {
              browserName: 'chrome',
              platform: 'OS X 10.9'
            },
            {
              browserName: 'chrome',
              platform: 'Windows 8'
            },
            {
              browserName: 'firefox',
              platform: 'OS X 10.9'
            },
            {
              browserName: 'firefox',
              platform: 'Windows 8'
            },
            {
              browserName: 'opera'
            },
            {
              browserName: 'internet explorer',
              version: '10'
            },
            {
              browserName: 'internet explorer',
              version: '11',
              platform: 'Windows 8.1'
            },
            {
              browserName: 'iphone'
            }
          ]
        }
      }
    },
    bower: {
      install: { }
    },
    supressSaucelabsOutput: {
      all: { }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // By default, just run tests
  grunt.registerTask('default', ['bower:install', 'convert', 'concat', 'jshint', 'buildTestFilesJson', 'buildGuideline', 'compressTestsJson', 'qunit:all']);

  // Build task.
  grunt.registerTask('build', ['bower:install', 'convert', 'concat', 'jshint', 'buildTestFilesJson', 'buildGuideline', 'compressTestsJson', 'uglify']);

  // Release task.
  grunt.registerTask('release', ['bower:install', 'convert', 'concat', 'jshint', 'buildTestFilesJson', 'qunit:all', 'buildGuideline', 'compressTestsJson', 'uglify', 'gh-pages']);

  // Test task.
  grunt.registerTask('test', ['bower:install', 'convert', 'concat', 'jshint', 'buildTestFilesJson', 'buildGuideline', 'compressTestsJson', 'qunit:all']);

  // Saucelabs task (need to add your own environment variables)
  grunt.registerTask('saucelabs', ['bower:install', 'convert', 'concat', 'jshint', 'buildTestFilesJson', 'buildGuideline', 'compressTestsJson', 'connect', 'supressSaucelabsOutput', 'saucelabs-qunit']);

  grunt.registerTask('publish', ['gh-pages']);
};
