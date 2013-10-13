/*! QUAIL quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('quail.json'),
    clean: {
      hooks: ['.git/hooks/pre-commit']
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
        src: ['src/js/core.js', 'src/js/components/*.js', 'src/js/custom/*.js'],
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Linting, mostly to test JSON.
  grunt.registerTask('lint', ['jshint']);

  // By default, just run tests
  grunt.registerTask('default', ['concat', 'qunit']);

  // Release task.
  grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

  // Release task.
  grunt.registerTask('release', ['jshint', 'concat', 'qunit', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['concat', 'jshint', 'qunit']);
};
