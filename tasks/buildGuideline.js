'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('buildGuideline', 'Take guideline JSON files and convert to a simple array.', function() {
    this.files.forEach(function(file) {
      var contents = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      });
      var data = JSON.parse(contents);
      var tests = [ ];
      for (var test in data) {
        if (typeof data[test].guidelines[file.guideline] !== 'undefined') {
          tests.push(test);
        }
      }
      grunt.file.write(file.dest, JSON.stringify(tests));
      
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};