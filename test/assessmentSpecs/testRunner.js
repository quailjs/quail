#!/usr/bin/env node

'use strict';

var stdio = require('stdio');
var fs = require('fs');
var http = require('http');
var httpServer = require('http-server');
var path = require('path');
var glob = require('glob');
var Q = require('q'); // https://github.com/kriskowal/q
var webdriverio = require('webdriverio')

var conf = require('../config/index.js');

var Mocha = require('mocha');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var chaiQuail = require('../../src/customAssertions/chai-quail');
chai.use(chaiQuail);
var seleniumOut;
var seleniumError;

global.expect = chai.expect;
global.assert = chai.assert;

// HTTP server for testing fixtures like jQuery and Quail.
var httpServerFixturesPort = 8888;
var httpServerAssessmentPagesPort = 9999;

var mochaRunner;
var _client;
var assessmentsPromise;
var httpServerFixtures;
var httpServerAssessmentPages;

// Set up test command execution arguments.
var execOptions = stdio.getopt({
  assessment: {
    key: 'I',
    args: 1,
    description: 'A single assessment to run.'
  }
});

Q.getUnhandledReasons(function (err) {
  console.error('Caught unhandled reason: ' + err);
});

/**
 * Closes the HTTP servers and exits the process.
 */
function shutdownTestRunner (err) {
  console.log('Shutting down the testrunner');
  if (httpServerFixtures) {
    httpServerFixtures.close();
  }
  if (httpServerAssessmentPages) {
    httpServerAssessmentPages.close();
  }
  if (_client && _client.end) {
    _client.end();
  }
  seleniumOut && fs.closeSync(seleniumOut);
  seleniumError && fs.closeSync(seleniumError);

  if (err) {
    console.error(err);
    return process.exit(1);
  }
  return process.exit(0);
}

process.on('SIGINT', function () {
  shutdownTestRunner('Received SIGINT');
});

process.on('uncaughtException', function (err) {
  console.error('uncaughtException');
  if (err.code === 'EADDRINUSE') {
    console.error('Oops!');
    console.error('Check ports ' + httpServerFixturesPort + ' and ' + httpServerAssessmentPagesPort + ' for running processes.');
    console.error('You can check for a process associated with a port like this: `lsof -i :' + httpServerFixturesPort + '`');
    console.error('Get the PID associated with the process, then stop it with this command: `kill -9 <pid>`, where <pid> is the process number.\n');
  }
  else {
    console.error(err);
  }
  shutdownTestRunner(1);
});

// The root path of the HTTP fixtures server.
var fixturesRoot = path.join(__dirname, '../..', 'dist');
var assessmentPagesRoot = path.join(__dirname, 'specs');
var testConfigPath = path.join(__dirname, '../', 'config');
var logPath = path.join(__dirname, '../..', 'logs');

/**
 * Load jQuery and Quail from different places in the repo.
 */
function serveScriptResource (response, resourcePath) {
  var resource;

  // jQuery
  if (resourcePath.indexOf('jquery.min.js') > -1) {
    resource = path.join(__dirname, '../..', 'node_modules/jquery/dist', resourcePath);
  }
  else if (resourcePath.indexOf('bundle.js') > -1) {
    resource = path.join(__dirname, '../..', 'dist', resourcePath);
  }
  else {
    resource = resourcePath;
  }

  fs.readFile(resource, 'utf-8', function (err, source) {
    if (err) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('<!DOCTYPE html>\n<html><body><p>The resource at `' + resource + '` does not exist.</p></body></html>');
    }
    else {
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.end(source);
    }
  });
}

// Build a lightweight http server to serve assets for running Quail.
// Using http instead of httpServer gives us more opportunity to debug requests.
httpServerFixtures = http.createServer(function (request, response) {
  var url = request.url;
  if (url.indexOf('.js') > -1 || url.indexOf('.map') > -1) {
    serveScriptResource(response, url);
  }
  // 406
  else {
    response.writeHead(406, {'Content-Type': 'text/html'});
    response.end('<!DOCTYPE html>\n<html><body><p>The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.</p></body></html>');
  }
})
.listen(httpServerFixturesPort);

// HTTP server for assessment pages.
httpServerAssessmentPages = httpServer
  .createServer({
    root: assessmentPagesRoot,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .listen(httpServerAssessmentPagesPort);

function startSelenium (callback) {
  // The local Selenium server.
  if (!process.env.TRAVIS) {
    var selenium = require('selenium-standalone');
    // Set up logging for the Selenium server child process.
    seleniumOut = fs.openSync(logPath + '/selenium-stdout.log', 'a');
    seleniumError = fs.openSync(logPath + '/selenium-stderr.log', 'a');
    var spawnOptions = {
      stdio: ['pipe', seleniumError, seleniumOut]
    };

    // Options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
    var seleniumArgs = [
      // '-logLongForm'
    ];

    var opts = {
      spawnOptions: spawnOptions,
      seleniumArgs: seleniumArgs
    };

    selenium.start(opts, function (err) {
      if (err) {
        if (/Error: Missing/.test(err)) {
          // Try to install selenium.
          console.warn(
            'Encountered a missing driver error.',
            'Run `npm run install-selenium-standalone` to install the missing drivers.',
            err
          );
          shutdownTestRunner(err);
        }
        else if (/Selenium process is already running/.test(err)) {
          callback();
        }
        else {
          shutdownTestRunner(err);
        }
      }
      else {
        callback();
      }
    });
  }
  else {
    callback();
  }
}

/**
 * Sets up and runs the Specs.
 */
function runSpecs (assessments) {
  // If we have no assessments to run, shut down the process with an error code.
  if (Object.keys(assessments) === 0) {
    shutdownTestRunner('No tests to run.');
  }
  // Methods available in the Spec runner (e.g. Mocha).
  // @todo Provide these methods through exports and move them into their
  // own file.
  global.quailTestRunner = {
    /**
     * The setup process involves:
     * 1. Initiating a webdriver client for the test suite
     * 2. Preparing the list of assessments
     * 3. Loading loading the indicated URL in a Selenium browser instance.
     *   a. jQuery
     *   b. Quail
     * 4. Evaluating the page with Quail and returning the results object.
     *   a. The evaluation of the page either resolves or rejects the promise
     *      object returned to the testing suite by the setup method.
     */
    setup: function (options) {
      var url = options.url;
      var indicatedAssessments = options.assessments;

      var clientPromise;
      var quailDeferred;
      var assessmentsDeferred;

      /**
       * Retrieves a webdriver client.
       */
      function retrieveWebdriver (resolve, reject) {
        startSelenium(function () {
          webdriverio
            .remote(conf)
            .init()
            .timeoutsAsyncScript(5000)
            .then(function () {
              // The reference to this.__proto__ is very intentional. It
              // is the only way to maintain a reference to the client
              // through the test runner execution. If `this` is refenced,
              // the referenced object is (presumably) garbage collected
              // and it disappears.
              var client = this.__proto__;
              _client = client;
              resolve(client);
            }, function (err) {
              reject(err);
            });
        });
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
            return Q.Promise(function (resolve) {
              resolve({
                client: client,
                assessments: assessmentsToRun
              });
            });
          }
          else {
            assessmentsDeferred.reject(new Error('No assessments to evaluate'));
          }
        })
        .fail(shutdownTestRunner);
      }

      /**
       * Loads a file using a <script> tag.
       *
       * This function is run in the browser context.
       */
      function loadScriptFile (filename, httpServerFixturesPort, finish) {
        function loadError (error) {
          finish(new Error({
            message: error
          }));
        }

        function loadSuccess () {
          finish('Loaded \'' + filename + '\'');
        }

        var head = document.getElementsByTagName('head')[0];
        // Append scripts.
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://localhost:' + httpServerFixturesPort + '/' + filename;
        s.onerror = loadError;
        s.onload = loadSuccess;
        if (head) {
          head.appendChild(s);
        }
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

        window.globalQuail.run({
          accessibilityTests: tests,
          html: jQuery('html'),
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
          },
          // Called when all the Cases in a Test are resolved.
          testComplete: function () {
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

        // Load Quail fixtures into the page.
        var fixtures = [
          // Load jQuery into the page.
          {
            args: ['jquery.min.js', httpServerFixturesPort],
            evaluate: loadScriptFile
          },
          // Load the Quail script into the page.
          {
            args: ['bundle.js', httpServerFixturesPort],
            evaluate: loadScriptFile
          },
          // Evaluate the HTML with Quail.
          {
            args: assets.assessments,
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
          function resolveFixture (result) {
            var data;
            var resondFn = fixture.respond;
            // Prepare the next fixture.
            index = index + 1;
            fixture = fixtures[index];
            // Run the response method if it exists.
            if (typeof resondFn === 'function') {
              data = resondFn(result);
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
          // function into an arguments array that will be passed to Selenium's
          // executeAsync method.
          var args = [].concat(fixture.evaluate, (fixture.args || []));
          // Run the async evaluation against the client object.
          client.executeAsync.apply(client, args)
            .then(
              resolveFixture,
              function (err) {
                console.error(err.message);
                client.end();
                quailDeferred.reject(err);
              }
            );
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
        .then(communicateWithSelenium)
        .fail(shutdownTestRunner);

      return Q.all([
        // Retrieve a webdriver client.
        clientPromise,
        // Prepare the list of assessments.
        assessmentsDeferred.promise,
        // Retrieve the results from the Quail evaluation.
        quailDeferred.promise
      ])
      .fail(shutdownTestRunner);
    },
    /**
     * Closes the client associated with the test suite.
     */
    teardown: function (client) {
      return Q.promise(function (resolve, reject) {
        client.end(function (err, ret) {
          if (err) {
            reject(err);
          }
          else {
            resolve(ret);
          }
        });
      });
    }
  };
  // Set up Mocha.
  mochaRunner = new Mocha({
    timeout: 1000000,
    reporter: 'spec',
    bail: false,
    require: 'babelhook'
  });
  /**
   * Adds files to Mocha and then runs Mocha.
   */
  function addAndRunMocha (files) {
    files.forEach(function (file) {
      mochaRunner.addFile(file);
    });
    mochaRunner.run(shutdownTestRunner);
  }
  // Set up the Mocha test runs.
  var specFiles;
  // Run a single test if one is indicated, otherwise, run them all.
  var single = execOptions.assessment;
  if (single) {
    if (single in assessments) {
      specFiles = __dirname + '/specs/**/' + single + 'Spec.js';
      // Gather the spec files and add them to the Mocha run.
      glob(specFiles, function (error, files) {
        if (error) {
          shutdownTestRunner(error);
        }
        addAndRunMocha(files);
      });
    }
    else {
      shutdownTestRunner('No implementation exists for the requested spec: ' + single);
    }
  }
  else {
    // specFiles = __dirname + '/specs/**/*Spec.js';
    // Read in the configured test filenames.
    fs.readFile(path.join(testConfigPath, 'assessmentsToRun.json'), {
      encoding: 'utf-8'
    }, function (err, assessmentsToRunJSON) {
      if (err) {
        shutdownTestRunner('Failed to load assessmentsToRun.json.');
      }
      var assessmentsToRun = JSON.parse(assessmentsToRunJSON);
      // Create a list of Specs to run. Remove filenames prepended with underscore.
      var assessmentSpecFiles = assessmentsToRun.filter(function (filename) {
        return filename.charAt(0) !== '_';
      }).map(function (filename) {
        // Expand the file names to full paths.
        return path.join(assessmentPagesRoot, filename, filename + 'Spec.js');
      });
      // Gather the spec files and add them to the Mocha run.
      addAndRunMocha(assessmentSpecFiles);
    });
  }
}

// Load the assessment defintions. The callback will start the evaluation of the
// specifications.
assessmentsPromise = Q.Promise(function (resolve, reject) {
  Q.nfcall(fs.readFile, fixturesRoot + '/tests.json', {
    encoding: 'utf-8'
  })
    .then(function (assessmentsJSON) {
      resolve(JSON.parse(assessmentsJSON));
    }, function (err) {
      reject(err);
    })
    .fail(shutdownTestRunner);
});

assessmentsPromise.done(runSpecs);
assessmentsPromise.fail(shutdownTestRunner);
