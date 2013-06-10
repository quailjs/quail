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
        src: ['src/quail.js'],
        dest: 'src/quail.min.js'
      }
    },
    qunit: {
      files: ['test/quail.html']
    },
    jlint: {
      
    },
    watch: {
      files: '<%= lint.files %>',
      tasks: 'lint qunit'
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
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit']);
  
  // Release task.
  grunt.registerTask('release', ['jshint', 'qunit', 'uglify']);
  
  // Travis task.
  grunt.registerTask('travis', ['jshint', 'qunit']);
};
