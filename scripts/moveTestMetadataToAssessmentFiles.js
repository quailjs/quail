#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var yamljs = require('yamljs');

// Load yaml file using yamljs.load
var assessments = yamljs.load(path.join(__dirname, '..', 'src', 'resources', 'tests.yml'));

function toUpperCase (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

Object.keys(assessments).forEach(function (key) {
  var a = assessments[key];
  // Build the string the represents the metadata.
  var meta = [];
  Object.keys(a).forEach(function (name) {
    meta.push('\t\t\'' + name + '\': ' + '\'some value\'');
  });
  // Get the assessment file.
  var assessmentFilePath = path.join(__dirname, '..', 'src', 'assessments', toUpperCase(key) + '.js');
  fs.readFile(assessmentFilePath, 'utf8', function (err, data) {
    if (err) {
      console.error('Coule not read file %s.', [assessmentFilePath]);
    }
    var newFile = data
      .replace('replace: \'this\'', meta.join('\n'));
    fs.open(assessmentFilePath, 'w', function (err, fd) {
      if (err) {
        console.error('Coule not create file %s.', [key + '.js']);
      }
      // Create the file.
      else {
        var buffer = new Buffer(newFile, "utf-8");

        fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
          if (err) {
            console.error(err);
          }
          // Close the file.
          fs.close(fd, function() {
            console.log('Wrote file %s.', [key + '.js']);
          });
        });
      }
    });
  });
});
