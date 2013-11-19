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
        footer: "\n" + '})(jQuery)',
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
      files: ['Gruntfile.js', 'src/quail.js', 'src/resources/**/*.json']
    },
    watch: {
      scripts: {
        files: ['src/js/*.js', 'src/js/components/*', 'src/js/custom/*', 'src/js/strings/*'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Linting, mostly to test JSON.
  grunt.registerTask('lint', ['jshint']);

  // By default, just run tests
  grunt.registerTask('default', ['concat', 'qunit']);

  // Build task.
  grunt.registerTask('build', ['convert', 'jshint', 'concat', 'uglify']);

  // Release task.
  grunt.registerTask('release', ['convert', 'jshint', 'concat', 'qunit', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['convert', 'concat', 'jshint', 'qunit']);
};
