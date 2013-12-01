/*! QUAIL quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('quail.json'),
    clean: {
      hooks: ['.git/hooks/pre-commit']
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
        files : {
          'dist/quail.jquery.min.js' : 'dist/quail.jquery.js'
        }
      },
      options : {
        banner: '<%= pkg.options.banner %>'
      }
    },
    qunit: {
      files: ['test/quail.html']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
            jQuery: true
        }
      },
      files: ['Gruntfile.js', 'dist/quail.jquery.js']
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
    buildGuideline : {
      dist : {
        files : [
          { src : 'dist/guidelines/508.json', dest : 'dist/guidelines/508.tests.json' },
          { src : 'dist/guidelines/wcag.json', dest : 'dist/guidelines/wcag.tests.json' }
        ]
      }
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
  grunt.loadNpmTasks('grunt-contrib-clean');


  // By default, just run tests
  grunt.registerTask('default', ['convert', 'concat', 'jshint', 'buildGuideline', 'qunit']);

  // Build task.
  grunt.registerTask('build', ['convert', 'concat', 'jshint', 'buildGuideline', 'uglify']);

  // Release task.
  grunt.registerTask('release', ['convert', 'concat', 'jshint', 'qunit', 'buildGuideline', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['convert', 'concat', 'jshint', 'buildGuideline', 'qunit']);
};
