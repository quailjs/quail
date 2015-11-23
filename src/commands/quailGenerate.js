var fs = require('fs');
var path = require('path');
var assessmentSpecsPath = path.join(__dirname, '..', 'test', 'assessmentSpecs');
var accessibilityTestsPath = path.join(__dirname, '..', 'test', 'accessibility-tests');
var templatePath = path.join(__dirname, '..', 'test', 'assessmentSpecs', 'templates');

// Create the assessment test from a template.
function copyTestTemplate (assessmentName, dir) {
  // Get the assessment test template.
  fs.readFile(path.join(templatePath, 'assessmentTestTemplate.js'), {
    encoding: 'utf8'
  }, function (err, template) {
    if (err) {
      process.exit(err);
    }
    // Replace the placeholders with the assessment name.
    var interpolatedFile = template.replace(/\{\{assessmentName\}\}/g, assessmentName);
    var newFile = path.join(dir, assessmentName + 'Spec.js');
    fs.stat(newFile, function (err) {
      if (err) {
        // Write the file to the assessment directory.
        fs.writeFile(newFile, interpolatedFile, {
          mode: 420 // 0644 in octal
        }, function (err) {
          if (err) {
            process.exit(err);
          }
          console.log('Created file ' + newFile + '\n');
        });
      }
      else {
        console.log('File ' + newFile + ' already exists.\n');
      }
    });
  });
}

// Copy HTML associated with the assessment or create a new one from a template.
function moveOrCopyHtmlTemplates (assessmentName, dir) {
  // Get a list of file names in ./test/accessibility-tests
  fs.readdir(accessibilityTestsPath, function (err, files) {
    if (err) {
      process.exit(err);
    }
    // Filter out files that have the name of the assessment in them.
    var rFilename = new RegExp(assessmentName, 'i');
    var assessmentFiles = files.filter(function (fileName) {
      return rFilename.test(fileName);
    });

    // If files were found, move them; otherwise, copy the template.
    if (assessmentFiles.length > 0) {
      var htmlFilePath, newHtmlFilePath;
      assessmentFiles.forEach(function (fileName) {
        htmlFilePath = path.join(accessibilityTestsPath, fileName);
        newHtmlFilePath = path.join(dir, fileName);
        fs.rename(htmlFilePath, newHtmlFilePath, function (err) {
          if (err) {
            console.error(err);
          }
          console.log('Copied');
          console.log('    ' + htmlFilePath);
          console.log('    ' + 'to');
          console.log('    ' + newHtmlFilePath + '\n');
        });
      });
    }
  });
}

function createAssessmentTestDirectory (assessmentName, dir) {
  // Create the directory for the assessment in assessmentSpecs/specs.
  fs.stat(dir, function (err) {
    // The directory does not exit, create it.
    if (err) {
      console.log('Create directory ' + dir + '\n');
      fs.mkdir(dir, '0755', function (err) {
        if (err) {
          process.exit(err);
        }
        else {
          copyTestTemplate(assessmentName, dir);
          moveOrCopyHtmlTemplates(assessmentName, dir);
        }
      });
    }
    else {
      console.log('Directory exists, ' + dir);
      copyTestTemplate(assessmentName, dir);
      moveOrCopyHtmlTemplates(assessmentName, dir);
    }
  });
}

/**
 * Generates the files necessary to test an assessment.
 */
module.exports = function quailGenerate (assessmentName) {
  var dir = path.join(assessmentSpecsPath, 'specs', assessmentName);
  createAssessmentTestDirectory(assessmentName, dir);
};
