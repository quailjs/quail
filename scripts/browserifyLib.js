var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var path = require('path');
var glob = require('glob');
var quailLibFilesPath = __dirname + '/../src/core/**/*.js';
var quailComponentFilesPath = __dirname + '/../src/js/**/*.js';
var quailAssessmentFilesPath = __dirname + '/../src/assessments/**/*.js';
// Gather the spec files and add them to the Mocha run.
glob(quailLibFilesPath, function (error, coreFiles) {
  if (error) {
    process.exit(1);
  }
  glob(quailComponentFilesPath, function (error, componentFiles) {
    if (error) {
      process.exit(1);
    }
    glob(quailAssessmentFilesPath, function (error, assessmentFiles) {
      if (error) {
        process.exit(1);
      }
      browserify({
        entries: []
          .concat(coreFiles)
          .concat(componentFiles)
          .concat(assessmentFiles),
        paths: [
          './src/core/',
          './src/js/',
          './src/js/components/',
          './src/js/strings/',
          './src/assessments/'
        ],
        options: {
          debug: false
        }
      })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
          console.log('Error : ' + err.message);
        })
        .pipe(fs.createWriteStream('dist/bundle.js'));
    });
  });
});
