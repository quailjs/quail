/*! QUAIL quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('quail.json'),
    concat: {
      options: {
        banner: '/*! QUAIL quailjs.org | quailjs.org/license */',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js']
      }
    },
    uglify: {
      options: {
        banner: '<%= concat.options.banner %>'
      },
      dist: {
        files : {
          'src/quail.min.js' : 'src/quail.js'
        }
      }
    },
    qunit: {
      files: ['test/quail.html']
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'test'
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
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Linting, mostly to test JSON.
  grunt.registerTask('lint', ['jshint']);

  // By default, just run tests
  grunt.registerTask('default', ['test']);

  // Release task.
  grunt.registerTask('release', ['jshint', 'qunit', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['jshint', 'qunit']);
};
