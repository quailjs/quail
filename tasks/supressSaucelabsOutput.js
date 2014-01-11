'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('supressSaucelabsOutput', 'Suppresses sharing secure information on saucelabs during verbose.', function(target) {
      grunt.log.currentwriteflags = grunt.log.writeflags;

		  grunt.log.writeflags = function(obj, prefix) {
		    if(prefix === 'Options' && typeof obj.username !== 'undefined') {
		      return;
		    }
		    grunt.log.currentwriteflags(obj, prefix);
		  };
  });
};