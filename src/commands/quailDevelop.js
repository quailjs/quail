var fs = require('fs');
var path = require('path');
var http = require('http');
var appOpener = require('opener');
var assessmentSpecsPath = path.join(
  __dirname,
  '..',
  '..',
  'test',
  'assessmentSpecs',
  'specs'
);

/**
 *
 */
function serveAssessmentTestPage (response, assessmentName) {
  // Load up a page with the assessment test page.
  fs.readFile(path.join(assessmentSpecsPath, assessmentName, assessmentName + '.html'), 'utf-8', function (err, source) {
    if (err) {
      console.error('\n' + err + '\n');
      process.exit(1);
    }
    // Insert <script> tags.
    var bodyTag = '</body>';
    source = source.slice(0, source.indexOf(bodyTag));
    // Javascript resources.
    source += '<script src="node_modules/jquery/dist/jquery.min.js" type="application/javascript"></script>';
    source += [
      '<script>',
      'window.assessmentName = \'' + assessmentName + '\';',
      '</script>'
    ].join('\n');
    source += '<script src="dist/runInBrowser.js" type="application/javascript"></script>';

    source += bodyTag + '</html>';
    // Respond to the HTTP request.
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end('<!DOCTYPE html>\n' + source);
  });
}

function serveScriptResource (response, resourcePath) {
  fs.readFile(path.join(
    __dirname,
    '..',
    '..',
    resourcePath
  ), 'utf-8', function (err, source) {
    if (err) {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });
      response.end('<!DOCTYPE html>\n<html><body><p>The resource at `' + resourcePath + '` does not exist.</p></body></html>');
    }
    else {
      response.writeHead(200, {
        'Content-Type': 'application/javascript'
      });
      response.end(source);
    }
  });
}

function serveAssetResource (response, resourcePath) {
  fs.readFile(resourcePath, function (err, image) {
    if (err) {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });
      response.end('<!DOCTYPE html>\n<html><body><p>The resource at `' + resourcePath + '` does not exist.</p></body></html>');
    }
    else {
      response.writeHead(200, {
        'Content-Type': 'image/gif'
      });
      response.end(image, 'binary');
    }
  });
}

function processAssessments (assessmentName, cmd, err, directories) {
  if (err) {
    console.error('\n' + err + '\n');
    process.exit(1);
  }
  // Filter out directories that start with '.'.
  directories = directories.filter(function (dir) {
    return !/^\./.test(dir);
  });
  // Exit if the requested assessment doesn't exist.
  if (directories.indexOf(assessmentName) === -1) {
    console.error('\nThe assessment `%s` does not exist. Please create it first.\n', assessmentName);
    process.exit(1);
  }

  // HTTP server for testing fixtures like jQuery and Quail.
  http
    .createServer(function (request, response) {
      var accepts = request.headers.accept;
      var url = request.url;
      var assetPath;
      // No accept header. 400
      if (!accepts) {
        response.writeHead(400, {
          'Content-Type': 'text/html'
        });
        response.end('<!DOCTYPE html>\n<html><body><p>The request is missing an Accept header.</p></body></html>');
      }
      // text/html
      else if (accepts.indexOf('text/html') > -1) {
        serveAssessmentTestPage(response, assessmentName);
      }
      // image
      else if (accepts.indexOf('image') > -1) {
        assetPath = path.join(assessmentSpecsPath, assessmentName, url);
        serveAssetResource(response, assetPath);
      }
      // application/javascript
      else if (url.indexOf('.js') > -1 || url.indexOf('.map') > -1) {
        serveScriptResource(response, url);
      }
      // 406
      else {
        response.writeHead(406, {
          'Content-Type': 'text/html'
        });
        response.end('<!DOCTYPE html>\n<html><body><p>The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.</p></body></html>');
      }
    })
    .listen(cmd.port);

  console.log('Listening on port ' + cmd.port);
  console.log();
  console.log('Press cmd-C to exit.');

  // Open the development page in a browser.
  appOpener('http://localhost:' + cmd.port);
}

/**
 *
 */
module.exports = function quailDevelop (assessmentName, cmd) {
  // Get a list of assessments.
  fs.readdir(assessmentSpecsPath, processAssessments.bind(this, assessmentName, cmd));
};
