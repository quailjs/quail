#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var yamljs = require('yamljs');

// Load yaml file using yamljs.load
var assessments = yamljs.load(path.join(__dirname, '..', 'src', 'resources', 'tests.yml'));

// Pull out assessments that are type selector.
var selectorAssessments = [];
fs.readFile(path.join(__dirname, '..', 'test', 'assessmentSpecs', 'templates', 'componentTemplate.js'), {
  encoding: 'utf-8'
}, function (err, template) {
  if (err) {
    console.error(err);
  }
  Object.keys(assessments).forEach(function (key) {
    var a = assessments[key];
    if (a.type === 'event' &&
          a.components.indexOf('event') > -1 &&
          a.components.indexOf('hasEventListener') > -1) {
      var filePath = path.join(__dirname, '..', 'lib', 'assessments', key + '.js');
      // Stat if an assessment script exists.
      // Raise a warning if it does.
      fs.open(filePath, 'r+', function (err, fd) {
        // The file does not exist.
        if (err) {
          fs.open(filePath, 'w', function (err, fd) {
            if (err) {
              console.error('Coule not create file %s.', [key + '.js']);
            }
            // Create the file.
            else {
              debugger;
              var component = a.components[0];
              var options = (function () {
                var opts = a.options || {};
                var optsArray = [];
                for (var key in opts) {
                  if (opts.hasOwnProperty(key)) {
                    optsArray.push(key + ': \'' + opts[key] + '\'');
                  }
                }
                return optsArray.join(',\n    ');
              }());
              var newFile = template
                .replace('%name%', key)
                .replace('%component%', component)
                .replace('%options%', options);

              var buffer = new Buffer(newFile, "utf-8");

              fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
                if (err) {
                  console.error(err);
                }
                // Close the file.
                fs.close(fd, function() {
                  console.log('Wrote file %s.', (key + '.js'));
                });
              });
            }
          });
        }
        else {
          console.warn('The file %s already exists.', (key + '.js'));
          fs.close(fd);
        }
      });
    }
  });
});

/* fs.readFile(path.join(__dirname, '..', 'htmlTemplate.html'), {
  encoding: 'utf-8'
}, function (err, template) {
  if (err) {
    console.error(err);
  }
  Object.keys(assessments).forEach(function (key) {
    var a = assessments[key];
    if (a.type === 'selector') {
      var htmlPath = path.join(__dirname, '..', 'test', 'assessmentSpecs', 'specs', key, key + '-nomatch.html');

      fs.open(htmlPath, 'r+', function (err, fd) {
        // The file does not exist.
        if (err) {
          fs.open(htmlPath, 'w', function (err, fd) {
            if (err) {
              console.error('Coule not create file %s.', [key + '-nomatch.html']);
            }
            // Create the file.
            else {
              var newFile = template.replace('%name%', key);

              var buffer = new Buffer(newFile, "utf-8");

              fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
                if (err) {
                  console.error(err);
                }
                // Close the file.
                fs.close(fd, function() {
                  console.log('Wrote file %s.', [key + '-nomatch.html']);
                });
              });
            }
          });
        }
        else {
          console.warn('The file %s already exists.', [key + '-nomatch.html']);
          fs.close(fd);
        }
      });
    }
  });
});

fs.readFile(path.join(__dirname, '..', 'specTemplate.js'), {
  encoding: 'utf-8'
}, function (err, template) {
  if (err) {
    console.error(err);
  }
  Object.keys(assessments).forEach(function (key) {
    var a = assessments[key];
    if (a.type === 'selector') {
      var specPath = path.join(__dirname, '..', 'test', 'assessmentSpecs', 'specs', key, key + 'Spec.js');

      fs.open(specPath, 'w', function (err, fd) {
        // The file does not exist.
        if (err) {
          console.error(err);
        }
        fs.open(specPath, 'w', function (err, fd) {
          if (err) {
            console.error('Coule not open file %s.', [key + 'Spec.js']);
          }
          // Create the file.
          else {
            var newFile = template.replace(/%name%/g, key);

            var buffer = new Buffer(newFile, "utf-8");

            fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
              if (err) {
                console.error(err);
              }
              // Close the file.
              fs.close(fd, function() {
                console.log('Wrote file %s.', [key + 'Spec.js']);
              });
            });
          }
        });
      });
    }
  });
}); */

// Copy the template
// a) replace the placeholders with the assessment name.
// b) replace the selector placeholder with the selector.


// Write it out to file.
// fs.writeFile(path.join(__dirname, '..', 'tmp', 'assessessments-table.html'), table, function (err) {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });
