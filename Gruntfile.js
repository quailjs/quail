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
          'vendor/RainbowVis-JS/rainbowvis.js',
          'lib/js/components/*.js',
          'lib/js/strings/*.js',
          'lib/core/**/*.js',
          'lib/assessments/**/*.js'
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
    exec: {
      babel: {
        cmd: 'npm run compile'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js',
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
        'src/**/*.js',
        'test/assessmentSpecs/testRunner.js',
        'test/assessmentSpecs/specs/**/*.js'
      ]
    },
    bower: {
      install: {
        options: {
          targetDir: './vendor',
          cleanBowerDir: true
        }
      }
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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Dev task
  grunt.registerTask('dev', [
    'jshint',
    'jscs',
    'exec:babel',
    'convert',
    'concat'
  ]);

  // By default, just run tests
  grunt.registerTask('default', [
    'bower:install',
    'dev',
    'test'
  ]);

  // Build task.
  grunt.registerTask('build', [
    'bower:install',
    'dev',
    'buildGuideline',
    'compressTestsJson',
    'uglify'
  ]);

  // Test task.
  grunt.registerTask('test', [
    'bower:install',
    'dev',
    'buildGuideline',
    'compressTestsJson',
    'karma',
    'execute:assessments'
  ]);

  // Release task.
  grunt.registerTask('release', [
    'bower:install',
    'dev',
    'test',
    'uglify',
    'gh-pages'
  ]);

  grunt.registerTask('publish', ['gh-pages']);
};
