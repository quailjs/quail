var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var path = require('path');
var glob = require('glob');
var quailLibFilesPath = __dirname + '/../src/core/**/*.js';
// Gather the spec files and add them to the Mocha run.
glob(quailLibFilesPath, function (error, files) {
  if (error) {
    process.exit(1);
  }
  browserify(files, {
    debug: false
  })
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log('Error : ' + err.message);
    })
    .pipe(fs.createWriteStream('dist/bundle.js'));
});
