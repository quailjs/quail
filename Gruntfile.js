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
    shell: {
      hooks: {
        command: 'cp git-hooks/pre-commit .git/hooks/'
      }
    },
    concat: {
      options: {
        banner: '<%= pkg.options.banner %>' + "\n" + ';(function($) {' + "\n",
        footer: "\n" + '})(jQuery);',
        stripBanners: true
      },  
      dist: {
        src: ['src/js/core.js', 'src/js/components/*.js', 'src/js/strings/*.js', 'src/js/custom/*.js'],
        dest: 'dist/quail.jquery.js'
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
      files: ['test/quail.html']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'src/**/*.js']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.yml'],
        tasks: ['convert', 'concat', 'jshint', 'buildGuideline', 'uglify'],
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
    'gh-pages': {
      options: {
        base: '',
        add: true
      },
      src: ['dist/**']
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
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // By default, just run tests
  grunt.registerTask('default', ['bower:install', 'convert', 'concat', 'jshint', 'buildGuideline', 'compressTestsJson', 'qunit']);

  // Build task.
  grunt.registerTask('build', ['bower:install', 'convert', 'concat', 'jshint', 'buildGuideline', 'compressTestsJson', 'uglify']);

  // Release task.
  grunt.registerTask('release', ['bower:install', 'convert', 'concat', 'jshint', 'qunit', 'buildGuideline', 'compressTestsJson', 'uglify', 'gh-pages']);

  // Test task.
  grunt.registerTask('test', ['bower:install', 'convert', 'concat', 'jshint', 'buildGuideline', 'compressTestsJson', 'qunit']);

  // Saucelabs task (need to add your own environment variables)
  grunt.registerTask('saucelabs', ['bower:install', 'convert', 'concat', 'jshint', 'buildGuideline', 'compressTestsJson', 'connect', 'supressSaucelabsOutput', 'saucelabs-qunit']);

  grunt.registerTask('publish', ['gh-pages']);
};
