#!/usr/bin/env node

'use strict';

var fs = require('fs');
var httpServer = require('http-server');
var path = require('path');
var selenium = require('selenium-standalone');
var Mocha = require('mocha');
var should = require('should');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.expect = chai.expect;
global.assert = chai.assert;
var glob = require('glob');
var Q = require('q'); // https://github.com/kriskowal/q
var mochaRunner, seleniumServer, webdriver, client, specFiles, assessmentsPromise;

Q.getUnhandledReasons(function (err) {
  console.log('Caught unhandled reason: ' + err);
});

process.on('uncaughtException', function(err) {
  console.log('Caught unhandled exception on process: ' + err);
});

// The root path of the HTTP server at port 8888.
var fixturesRoot = path.join(__dirname, '../..', 'dist');
var assessmentPagesRoot = path.join(__dirname, 'specs');
var logPath = path.join(__dirname, '../..', 'logs');

// HTTP server for testing fixtures like jQuery and Quail.
var httpServerFixtures = httpServer
  .createServer({
    root: fixturesRoot,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .listen(8888);

// HTTP server for assessment pages.
var httpServerAssessmentPages = httpServer
  .createServer({
    root: assessmentPagesRoot,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .listen(9999);

// Set up logging for the Selenium server child process.
var seleniumOut = fs.openSync(logPath + '/selenium-stdout.log', 'a');
var seleniumError = fs.openSync(logPath + '/selenium-stderr.log', 'a');
var spawnOptions = {
  stdio: ['pipe', seleniumError, seleniumOut]
};

// Options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [
  // '-logLongForm'
];

// Selenium browser driver instance configuration.
var conf = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  logLevel: 'silent' // verbose | silent | command | data | result
};

// The Selenium server.
seleniumServer = selenium(spawnOptions, seleniumArgs);
// WebdriverIO requires a running selenium servier. This feels like it could easily
// suffer from race conditions wherein the selenium server isn't started before
// webdriver is initialized, but I don't see how to get a callback fired from
// child_process.spawn.
webdriver = require('webdriverio');

/**
 * Closes the HTTP servers and exits the process.
 */
function shutdownTestRunner (failures) {
  if (httpServerFixtures) {
    httpServerFixtures.close();
  }
  if (httpServerAssessmentPages) {
    httpServerAssessmentPages.close();
  };
  return process.exit(failures);
}

/**
 * Sets up and runs the Specs.
 */
function runSpecs (assessments) {
  // If we have no assessments to run, shut down the process with an error code.
  if (Object.keys(assessments) == 0) {
    shutdownTestRunner(1);
  }

  // Set up the Mocha test runs.
  specFiles = __dirname + '/specs/aMustHaveTitle/*Spec.js';

  // Gather the spec files and add them to the Mocha run.
  glob(specFiles, function (error, files) {

    /**
     * Clean up after Mocha has finished its run.
     */
    function cleanup (failures) {
      if (!client) {
        return shutdownTestRunner(failures);
      }

      return client.end(function (err, ret) {
        shutdownTestRunner(failures);
      });
    }

    mochaRunner = new Mocha({
      timeout: 1000000,
      reporter: 'spec'
    });

    files.forEach(function (file) {
      mochaRunner.addFile(file);
    });

    mochaRunner.run(cleanup);
  });

  // Methods available in the Spec runner (e.g. Mocha).
  // @todo Provide these methods through exports and move them into their
  // own file.
  global.quailTestRunner = {
    noError: function(err) {
      assert(err === undefined);
    },
    checkResult: function(expected) {
      return function(err, result) {
        h.noError(err);

        if(expected instanceof Array) {
          expected.should.containDeep([result]);
        } else {
          expected.should.be.exactly(result);
        }
      };
    },
    // The setup process involves:
    // 1. Preparing the list of assessments
    // 2. Initiating a webdriver client for the test suite
    // 3. Loading loading the indicated URL in a Selenium browser instance.
    //   a. jQuery
    //   b. Quail
    // 4. Evaluating the page with Quail and returning the results object.
    //   a. The evaluation of the page either resolves or rejects the promise
    //      object returned to the testing suite by the setup method.
    setup: function(url, indicatedAssessments, newSession) {
      // Retrieve a webdriver client.
      function retrieveWebdriver (resolve, reject) {
        // If an instance already exists and no new session was requested, then
        // return existing instance.
        if (client && !newSession) {
          debugger;
          console.log('  Reusing the existing Selenium session');
          resolve(client);
        }
        // Otherwise return a new session instance.
        else {
          console.log('  Requesting a new Selenium session...');
          return Q.when(webdriver.remote(conf).init())
            .then(function (webdriver) {
              client = webdriver;
              client.timeoutsAsyncScript(5000);
              resolve(client);
            }, function () {
              reject(new Error('Failed to start a webdriverio client.'));
            });
        }
      }

      // Prepare the list of assessments.
      function prepareAssessmentList (resolve, reject) {
        // Filter the list of assessments if the Spec indicates a subset.
        return assessmentsPromise.then(function (assessments) {
          var assessmentsToRun = assessments;
          if (indicatedAssessments && indicatedAssessments.length > 0) {
            assessmentsToRun = {};
            indicatedAssessments.forEach(function (name) {
              if (name in assessments) {
                assessmentsToRun[name] = assessments[name];
              }
            });
          }
          if (Object.keys(assessmentsToRun).length > 0) {
            resolve(assessmentsToRun);
          }
          else {
            reject(new Error('No assessments to evaluate'));
          }
        });
      }

      return Q.all([
        // Retrieve a webdriver client.
        Q.Promise(retrieveWebdriver),
        // Prepare the list of assessments.
        Q.Promise(prepareAssessmentList)
      ]);
    }
  };
}

// Load the assessment defintions. The callback will start the evaluation of the
// specifications.
assessmentsPromise = Q.Promise(function (resolve) {
  Q.nfcall(fs.readFile, fixturesRoot + '/tests.json', "utf-8")
    .then(function (assessmentsJSON) {
      resolve(JSON.parse(assessmentsJSON));
    });
});

assessmentsPromise.done(runSpecs);
