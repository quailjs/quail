var fs = require('fs');
var path = require('path');
var assessmentSpecsPath = path.join(__dirname, '..', 'test', 'assessmentSpecs');
var templatePath = path.join(__dirname, '..', 'test', 'assessmentSpecs', 'templates');

/**
 * Generates the files necessary to test an assessment.
 */
module.exports = function quailGenerate (assessmentName, cmd) {

  var dir = path.join(assessmentSpecsPath, 'specs', assessmentName);

  // Create the directory for the assessment in assessmentSpecs/specs.
  fs.stat(dir, function (err, stats) {
    // The directory does not exit, create it.
    if (err) {
      console.log('Create directory ' + dir);
      fs.mkdir(dir, 0755, function (err) {
        if (err) {
          process.exit(err);
        }
        else {
          copyTemplate(assessmentName, dir);
        }
      });
    }
    else {
      console.log('Directory exists, ' + dir);
      copyTemplate(assessmentName, dir);
    }
  });

  // Create the assessment test from a template.
  function copyTemplate (assessmentName, dir) {
    // Get the assessment test template.
    fs.readFile(path.join(templatePath, 'assessmentTestTemplate.js'), function (err, template) {
      if (err) {
        process.exit(err);
      }
      var interpolatedFile = template.toString().replace(/\{\{assessmentName\}\}/g, assessmentName);
      var newFile = path.join(dir, assessmentName + '.js');
      fs.stat(newFile, function (err, stats) {
        if (err) {
          // Write the file to the assessment directory.
          fs.writeFile(newFile, interpolatedFile, {
            mode: 420 // 0644 in octal
          }, function (err) {
            if (err) {
              process.exit(err);
            }
            console.log('Created file ' + newFile);

            process.exit(0);
          });
        }
        else {
          console.log('File ' + newFile + ' already exists');
          process.exit(0);
        }
      });
      // Replace the placeholders with the assessment name.
    });
  }

  // Copy or create the HTML file(s).
}
