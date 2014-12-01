#!/usr/bin/env node

'use strict';

var httpServer = require('http-server');
var path = require('path');
var selenium = require('selenium-standalone');
var Mocha = require('mocha');
var should = require('should');
var chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;
var glob = require('glob');
var tests = {};
var client, specFiles;

// The root path of the HTTP server at port 8888.
var fixturesRoot = path.join(__dirname, '../..', 'dist');
var assessmentPagesRoot = path.join(__dirname, 'specs');

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


var mocha = new Mocha({
  timeout: 1000000,
  reporter: 'spec'
});

var spawnOptions = {
  stdio: 'inherit'
};

// Options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [];

// Selenium browser driver instance configuration.
var conf = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  logLevel: 'silent' // verbose | silent | command | data | result
};

// The Selenium server.
var server = selenium(spawnOptions, seleniumArgs);

// Set up the Mocha test runs.
specFiles = __dirname + '/specs/**/*Spec.js';

// Gather the spec files and add them to the Mocha run.
glob(specFiles, function (error, files) {

  files.forEach(function(file) {
    mocha.addFile(file);
  });

  mocha.run(function (failures) {
    if (!client) {
      return process.exit(failures);
    }

    client.end(function() {
      if (httpServerFixtures) {
        httpServerFixtures.close();
      }
      if (httpServerAssessmentPages) {
        httpServerAssessmentPages.close();
      };
      process.exit(failures);
    });
  });
});

//
global.h = {
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
  setup: function(url, newSession) {
    return function (done) {
      var self = this; // This is the Mocha test object.
      var wdjs = require('webdriverio');

      // if instance already exists and no new session was requested return existing instance
      if (client && !newSession && newSession !== null) {
        this.client = client;

      }
      // if new session was requested create a temporary instance
      else if (newSession && newSession !== null) {
        this.client = wdjs.remote(conf).init();

      }
      // otherwise store created intance for other specs
      else {
        this.client = client = wdjs.remote(conf).init();
      }

      /**
       * Loads a file using a <script> tag.
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
       * Responds to an evaluateAsync call. It's a simple err reporting response.
       */
      function respondToEvaluate (err, ret) {
        if (err) {
          return err;
        }
      }

      /**
       * Responds to an Ajax load of tests.
       */
      function respondToTestsLoaded (err, ret) {
        if (err) {
          return err;
        }
        var testData = ret && JSON.parse(ret.value) || {};
        var name;
        for (name in testData) {
          if (testData.hasOwnProperty(name)) {
            tests[name] = testData[name];
          }
        }
      }

      /**
       * Evaluates a page using Quail, which has been loading into the page already.
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
        try {
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
        catch (error) {
          window.jsErrors.push(error);
        }
      }

      /**
       * Assigns the responds of a Quail evaluation to the test suite object.
       */
      function respondToQuailEvaluation (err, ret) {
        if (err) {
          return err;
        }
        if (ret && ret.value) {
          self.results = JSON.parse(ret.value);
        }
      }

      // Load Quail fixtures into the page.
      var fixtures = [
        // Add error handling into the page.
        {
          evaluate: function (finish) {
            window.jsErrors = [];

            window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
              window.jsErrors.push(errorObj);
            }
            finish();
          }
        },
        // Load jQuery into the page.
        {
          args: ['jquery.min.js'],
          evaluate: loadScriptFile,
          respond: respondToEvaluate
        },
        // Load the Quail script into the page.
        {
          args: ['quail.jquery.js'],
          evaluate: loadScriptFile,
          respond: respondToEvaluate
        },
        // Load the assessment definitions file.
        {
          args: ['tests.json'],
          evaluate: loadAjaxFile,
          respond: respondToTestsLoaded
        },
        // Evaluate the HTML with Quail.
        {
          args: [tests],
          evaluate: evaluateWithQuail,
          respond: respondToQuailEvaluation
        },
        // Check the page for JavaScript errors. If any errors exist, close
        // testing and report the error, otherwise return control to the test
        // suite.
        {
          evaluate: function (finish) {
            finish(window.jsErrors);
          },
          respond: function (err, ret) {
            // Return the last Error. The author will need to run down the stack
            // if there are more than one or do some debugging here. But this at
            // least gives us a real Error object to pass to the done() function.
            var pageError = ret && ret.value && ret.value.length > 0 && ret.value[0];
            return err || pageError || null;
          }
        }
      ];

      /**
       * Loads fixtures in a linked list so that asynchronous script evalus are run
       * sequentially. Later fixtures in the fixture array can depend on results from
       * any previous fixture. Maybe it would be better to do this with promises?
       */
      function loadFixture (fixture, index) {
        var self = this;
        var args = [].concat(fixture.evaluate, fixture.args || [], function (err, ret) {
            var error;
            var resondFn = fixture.respond;
            // Prepare the next fixture.
            index = index + 1;
            fixture = fixtures[index];
            // Run the response method if it exists.
            if (typeof resondFn === 'function') {
              error = resondFn(err, ret);
            }
            // Run the next fixture if there is one and no error was returned from
            // the response method.
            if (fixture && !error) {
              loadFixture.apply(self, [fixture, index]);
            }
            // Or return control to the test suite. Mocha complains if done() is
            // invoked with anything that isn't an Error object.
            else {
              done(error);
            }
          });
        // Run the async evaluation against the client object.
        self
          .client
          .executeAsync.apply(self.client, args);
      }
      // Prepare to start the fixture loading.
      var loadFixtureBound = loadFixture.bind(self, fixtures[0], 0);
      // Load the requested URL then start the fixture loading.
      this.client
        .timeoutsAsyncScript(5000)
        .url(url, loadFixtureBound);
    };
  }
};
