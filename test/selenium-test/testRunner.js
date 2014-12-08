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
    setup: function(options) {
      var url = options.url;
      var indicatedAssessments = options.assessments;
      var newSession = options.newSession;

      var clientPromise;
      var quailDeferred;
      var assessmentsDeferred;

      /**
       * Retrieves a webdriver client.
       */
      function retrieveWebdriver (resolve, reject) {
        // If an instance already exists and no new session was requested, then
        // return existing instance.
        if (client && !newSession) {
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

      /**
       * Prepares the list of assessments.
       */
      function prepareAssessmentList (client) {
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
            assessmentsDeferred.resolve(assessmentsToRun);
            return {
              client: client,
              assessments: assessmentsToRun
            };
          }
          else {
            assessmentsDeferred.reject(new Error('No assessments to evaluate'));
          }
        });
      }

      /**
       * Loads a file using a <script> tag.
       *
       * This function is run in the browser context.
       */
      function loadScriptFile (filename, finish) {
        function loadError (error) {
          finish('Failed to load \'' + filename + '\': ' + error);
        }

        function loadSuccess () {
          finish('Loaded \'' + filename + '\'');
        }

        var head = document.getElementsByTagName('head')[0];
        // Append scripts.
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://localhost:8888/' + filename;
        s.onerror = loadError;
        s.onload = loadSuccess;
        if (head) head.appendChild(s);
      }

      /**
       * Loads files via AJAX GET in the browser instance.
       *
       * This function is run in the browser context.
       */
      function loadAjaxFile (filename, finish) {

        function loadError (error) {
          finish('Failed to load \'' + filename + '\': ' + error);
        }

        function loadSuccess () {
          if (this.status == 200) {
            finish(this.response);
          }
          else {
            loadError(this.status);
          }
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'http://localhost:8888/' + filename, true);
        xhr.onload = loadSuccess;
        xhr.onerror = loadError;
        xhr.send();
      }

      /**
       * Evaluates a page using Quail, which has been loading into the page already.
       *
       * This function is run in the browser context.
       */
      function evaluateWithQuail (tests, finish) {
        // Basic output structure attributes.
        var output = {
          tests: {},
          successCriteria: {},
          stats: {
            tests: 0,
            cases: 0
          }
        };

        jQuery('html').quail({
          accessibilityTests: tests,
          // Called when an individual Case in a test is resolved.
          caseResolve: function (eventName, test, _case) {
            var name = test.get('name');
            if (!output.tests[name]) {
              output.tests[name] = {
                id: name,
                title: test.get('title'),
                description: test.get('description'),
                type: test.get('type'),
                testability: test.get('testability'),
                guidelines: test.get('guidelines') || {},
                tags: test.get('tags'),
                cases: []
              };
            }
            // Push the case into the results for this test.
            output.tests[name].cases.push({
              status: _case.get('status'),
              selector: _case.get('selector'),
              html: _case.get('html')
            });
            // Increment the cases count.
            output.stats.cases++;
            console.log(output);
          },
          // Called when all the Cases in a Test are resolved.
          testComplete: function () {
            // console.log('Finished testing ' + test.get('name') + '.');
            // Increment the tests count.
            output.stats.tests++;
          },
          // Called when all the Tests in a TestCollection are completed.
          testCollectionComplete: function () {
            // Push the results of the test out to the Phantom listener.
            finish(JSON.stringify(output));
          }
        });
      }

      /**
       * Assigns the responds of a Quail evaluation to the test suite object.
       */
      function respondToQuailEvaluation (ret) {
        return ret && ret.value && JSON.parse(ret.value) || {};
      }

      /**
       * Inject Quail assets and runs the assessments against the provided
       * webdriver client.
       */
      function communicateWithSelenium (assets) {
        var client = assets.client;
        var assessments = assets.assessments;

        // Load Quail fixtures into the page.
        var fixtures = [
          // Load jQuery into the page.
          {
            args: ['jquery.min.js'],
            evaluate: loadScriptFile
          },
          // Load the Quail script into the page.
          {
            args: ['quail.jquery.js'],
            evaluate: loadScriptFile
          },
          // Evaluate the HTML with Quail.
          {
            args: [assessments],
            evaluate: evaluateWithQuail,
            respond: respondToQuailEvaluation
          }
        ];

        /**
         * Loads fixtures in a linked list so that asynchronous script evalus are run
         * sequentially. Later fixtures in the fixture array can depend on results from
         * any previous fixture. Maybe it would be better to do this with promises?
         */
        function loadFixture (fixture, index) {
          /**
           * Wraps the configured resolution script in order to kick off the next
           * fixture evaluation.
           *
           * @param Object err
           *   A WebdriverIO error object.
           * @param Object ret
           *   The result of the evalution of the script in the Selenium browser
           *   context.
           */
          function resolveFixture (err, ret) {
            if (err) {
              quailDeferred.reject(err);
              return;
            }
            var data;
            var resondFn = fixture.respond;
            // Prepare the next fixture.
            index = index + 1;
            fixture = fixtures[index];
            // Run the response method if it exists.
            if (typeof resondFn === 'function') {
              data = resondFn(ret);
            }
            // Run the next fixture if there is one and no error was returned from
            // the response method.
            if (fixture && !data) {
              loadFixture.apply(client, [fixture, index]);
            }
            // Or return control to the test suite. Mocha complains if done() is
            // invoked with anything that isn't an Error object.
            else {
              quailDeferred.resolve(data);
            }
          }
          // Combine the evaluation script, any arguments and the wrapped resolve
          // function into an arguments array that will be passed to Seleniums
          // executeAsync method.
          var args = [].concat(fixture.evaluate, (fixture.args || []), resolveFixture);
          // Run the async evaluation against the client object.
          client.executeAsync.apply(client, args);
        }
        // Prepare to start the fixture loading.
        var loadFixtureBound = loadFixture.bind(client, fixtures[0], 0);
        // Load the requested URL then start the fixture loading.
        client.url(url, loadFixtureBound);
      }

      // Set up the promises that will be returned to the Mocha before function.
      clientPromise = Q.Promise(retrieveWebdriver);
      quailDeferred = Q.defer();
      assessmentsDeferred = Q.defer();

      // Process the assessment list and then Quail once we have a client.
      clientPromise
        .then(prepareAssessmentList)
        .then(communicateWithSelenium);

      return Q.all([
        // Retrieve a webdriver client.
        clientPromise,
        // Prepare the list of assessments.
        assessmentsDeferred.promise,
        // Retrieve the results from the Quail evaluation.
        quailDeferred.promise
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
