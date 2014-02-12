'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('buildTestFilesJson', 'Build a central JSON file of unit tests.', function() {
    var tests;
    this.files.forEach(function(file) {  
      tests = [];
      var contents = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          tests.push(filepath.replace('test/', ''));
          return true;
        }
      });
      grunt.file.write(file.dest, JSON.stringify(tests));
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};