/*! QUAIL quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('quail.json'),
    copy: {
      vendor: {
        src: [
          'node_modules/jquery/dist/jquery.min.js'
        ],
        dest: 'dist/',
        expand: true,
        flatten: true
      }
    },
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
        banner: [
          "<%= pkg.options.banner %>",
          "!function(root, factory) {",
          "  if (typeof define === 'function' && define.amd) {",
          "    define(['jquery'], factory);",
          "  } else {",
          "    factory(root.jQuery);",
          "  }",
          "}(this, function($) {",
          "  'use strict';",
          "  var jQuery = jQuery || $;"
        ].join("\n"),
        footer: "\n" + '});',
        stripBanners: true
      },
      dist: {
        src: [
          'lib/quail.jquery.js',
          'lib/quail.js',
          'src/js/components/*.js',
          'src/js/strings/*.js',
          'lib/assessments/**/*.js',
          'lib/core/**/*.js'
        ],
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
    karma: {
      unit: {
        configFile: 'config/karma-unit.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    execute: {
      assessments: {
        options: {
          cwd: '.'
        },
        src: ['test/assessmentSpecs/testRunner.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/js/**/*.js',
        'lib/**/*.js',
        'test/assessmentSpecs/*.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'src/**/*.js',
          'src/**/*.yml'
        ],
        tasks: [
          'convert',
          'concat',
          'jshint',
          'jscs',
          'buildGuideline',
          'uglify'
        ],
        options: {
          spawn: false
        }
      },
      jscs: {
        files: [
          '.jscsrc',
          'src/**/*.js'
        ],
        tasks: [
          'jscs'
        ]
      }
    },
    chmod: {
      bin: {
        options: {
          mode: '711'
        },
        src: ['bin/*']
      }
    },
    buildGuideline: {
      dist: {
        files: [
          {
            guideline: '508',
            src: 'dist/tests.json',
            dest: 'dist/guidelines/508.tests.json'
          },
          {
            guideline: 'wcag',
            src: 'dist/tests.json',
            dest: 'dist/guidelines/wcag.tests.json'
          }
        ]
      }
    },
    compressTestsJson: {
      dist: {
        files: [
          {
            src: 'dist/tests.json',
            dest: 'dist/tests.min.json'
          }
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
    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: [
        'lib/**/*.js',
        'src/js/*.js',
        'test/assessmentSpecs/testRunner.js',
        'test/assessmentSpecs/specs/**/*.js'
      ]
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-gh-pages');

  // By default, just run tests
  grunt.registerTask('default', [
    'convert',
    'concat',
    'jshint',
    'jscs',
    'buildGuideline',
    'compressTestsJson',
    'karma',
    'execute:assessments'
  ]);

  // Dev task
  grunt.registerTask('dev', [
    'convert',
    'concat',
    'jshint',
    'jscs'
  ]);

  // Build task.
  grunt.registerTask('build', [
    'convert',
    'concat',
    'jshint',
    'jscs',
    'buildGuideline',
    'compressTestsJson',
    'uglify'
  ]);

  // Release task.
  grunt.registerTask('release', [
    'convert',
    'concat',
    'jshint',
    'jscs',
    'karma',
    'execute:assessments',
    'buildGuideline',
    'compressTestsJson',
    'uglify',
    'gh-pages'
  ]);

  // Test task.
  grunt.registerTask('test', [
    'convert',
    'concat',
    'copy',
    'jshint',
    'jscs',
    'buildGuideline',
    'compressTestsJson',
    'karma',
    'execute:assessments'
  ]);

  grunt.registerTask('publish', ['gh-pages']);
};
