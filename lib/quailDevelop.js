var fs = require('fs');
var shell = require('shelljs');
var path = require('path');
var http = require('http');
var opener = require('opener');
var assessmentSpecsPath = path.join(__dirname, '..', 'test', 'assessmentSpecs', 'specs');

/**
 *
 */
module.exports = function quailDevelop (assessmentName, cmd) {
  // Get a list of assessments.
  fs.readdir(assessmentSpecsPath, processAssessments.bind(this, assessmentName, cmd));
}

function serveAssessmentTestPage (response, assessmentName) {
  // Load up a page with the assessment test page.
  fs.readFile(path.join(assessmentSpecsPath, assessmentName, assessmentName + '.html'), 'utf-8', function (err, source) {
    if (err) {
      console.error("\n" + err + "\n");
      process.exit(1);
    }
    // Insert <script> tags.
    var bodyTag = '</body>';
    source = source.slice(0, source.indexOf(bodyTag));
    // Javascript resources.
    source += '<script src="node_modules/jquery/dist/jquery.min.js"></script>';
    source += '<script src="dist/quail.jquery.js"></script>';
    source += [
      '<script>',
        'window.assessmentName = \'' + assessmentName + '\';',
      '</script>'
    ].join('\n');
    source += '<script src="lib/development/runQuailViaBrowser.js"></script>';

    source += bodyTag + '</html>';
    // Respond to the HTTP request.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("<!DOCTYPE html>\n" + source);
  });
}

function serveScriptResource (response, resourcePath) {
  fs.readFile(path.join(__dirname, '..', resourcePath), 'utf-8', function (err, source) {
    if (err) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('<!DOCTYPE html>\n<html><body><p>The resource at `' + resourcePath + '` does not exist.</p></body></html>');
    }
    else {
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.end(source);
    }
  });
}

function processAssessments (assessmentName, cmd, err, directories) {
  if (err) {
    console.error("\n" + err + "\n");
    process.exit(1);
  }
  // Filter out directories that start with '.'.
  directories = directories.filter(function (file) {
    return !/^\./.test(file);
  });
  // Exit if the requested assessment doesn't exist.
  if (directories.indexOf(assessmentName) === -1) {
    console.error("\nThe assessment `%s` does not exist. Please create it first.\n", assessmentName);
    process.exit(1);
  }

  // HTTP server for testing fixtures like jQuery and Quail.
  http
    .createServer(function (request, response) {
      debugger;
      switch (request.url) {
      case '/':
        serveAssessmentTestPage(response, assessmentName);
        break;
      default:
        serveScriptResource(response, request.url);
      }
    })
    .listen(8787);

  console.log('Listening on port :8787');
  console.log();
  console.log('Press cmd-C to exit.');

  // Open the development page in a browser.
  opener('http://localhost:8787');
}
