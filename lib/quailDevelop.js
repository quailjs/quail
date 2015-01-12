var shell = require('shelljs');
var path = require('path');
var httpServer = require('http-server');
var opener = require('opener');
var fixturesRoot = path.join(__dirname, '..', 'dist');

/**
 *
 */
module.exports = function quailDevelop (assessmentName, cmd) {
  // HTTP server for testing fixtures like jQuery and Quail.
  var httpServerFixtures = httpServer
    .createServer({
      root: fixturesRoot,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .listen(8787);

  console.log('Listening on port :8787');
  console.log();
  console.log('Press cmd-C to exit.');

  // Open the development page in a browser.
  opener('http://localhost:8787');
}
