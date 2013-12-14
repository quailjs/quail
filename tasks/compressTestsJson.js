'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('compressTestsJson', 'Take test JSON files and compress.', function() {
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
      grunt.file.write(file.dest, JSON.stringify(data));
      
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};