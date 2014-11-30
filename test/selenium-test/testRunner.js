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
var httpServerInstance, client, specFiles;

var root = path.join(__dirname, '../..', 'dist');

var mocha = new Mocha({
  timeout: 1000000,
  reporter: 'spec'
});

var spawnOptions = {
  stdio: 'pipe'
};

// options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [
  // '-debug'
];

var server = selenium(spawnOptions, seleniumArgs);

server.stdout.on('data', function (output) {
  console.log(output);
});

specFiles = __dirname + '/Spec.js';

glob(specFiles, function (error, files) {

  files.forEach(function(file) {
    mocha.addFile(file);
  });

  mocha.run(function (failures) {
    if (!client) {
      return process.exit(failures);
    }

    client.end(function() {
      if (httpServerInstance) {
        httpServerInstance.close();
      }
      process.exit(failures);
    });
  });
});

var conf = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  logLevel: 'result'
};

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
      var self = this;
      var wdjs = require('webdriverio');

      // HTTP server
      if (!httpServerInstance) {
        httpServerInstance = httpServer
          .createServer({
            root: root,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .listen(8888);
      }

      // if instance already exists and no new session was requested return existing instance
      if (client && !newSession && newSession !== null) {
        this.client = client;

      }
      // if new session was requested create temporary instance
      else if (newSession && newSession !== null) {
        this.client = wdjs.remote(conf).init();

      }
      // otherwise store created intance for other specs
      else {
        this.client = client = wdjs.remote(conf).init();
      }

      /**
       *
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
       *
       */
      function respondToEvaluate (err, ret) {
        if (err) {
          done(err);
          return;
        }
      }

      // Load the request URL and add some error handling.
      this.client
        .url(url)
        .timeoutsAsyncScript(5000)
        .execute(function () {
          window.jsErrors = [];

          window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
            var report = 'Error: ' + errorMsg + '\n' +
              ' Script: ' + url + '\n' +
              ' Line: ' + lineNumber + '\n' +
              ' Column: ' + column + '\n' +
              ' StackTrace: ' +  errorObj + '\n';
            window.jsErrors.push(report);
          }
        });

      // Load Quail fixtures into the page.
      var fixtures = [
        {
          filename: 'jquery.min.js',
          evaluate: loadScriptFile,
          respond: respondToEvaluate
        },
        {
          filename: 'quail.jquery.js',
          evaluate: loadScriptFile,
          respond: respondToEvaluate
        }
      ];

      function loadFixture (fixture, index) {
        self
          .client
          .executeAsync(fixture.evaluate, fixture.filename, function (err, ret) {
            fixture.respond(err, ret);
            // Load the next Fixture.
            index = index + 1;
            fixture = fixtures[index];
            if (fixture) {
              loadFixture(fixture, index);
            }
          });
      }
      loadFixture(fixtures[0], 0);

      // Load the test definitions.
      var testfiles = ['tests.json'];
      var tests = {
        "inputTextHasLabel": {
          "type": "label",
          "testability": 1,
          "title": {
            "en": "All \"input\" elements should have a corresponding \"label\"",
            "nl": "Alle invoerelementen moeten een bijbehorend \"label\" hebben"
          },
          "description": {
            "en": "All <code>input</code> elements should have a corresponding <code>label</code> element. Screen readers often enter a \"form mode\" where only label text is read aloud to the user",
            "nl": "Alle <code>input</code>-elementen moeten een bijbehorend <code>label</code>-element hebben. Schermlezers maken vaak gebruik van een \"formuliereninstelling\" waarbij alleen de tekst van de labels hardop aan de gebruiker wordt voorgelezen."
          },
          "guidelines": {
            "wcag": {
              "1.1.1": {
                "techniques": [
                  "H44"
                ]
              },
              "1.3.1": {
                "techniques": [
                  "H44",
                  "F68"
                ]
              },
              "2.1.1": {
                "techniques": [
                  "H91"
                ]
              },
              "2.1.3": {
                "techniques": [
                  "H91"
                ]
              },
              "3.3.2": {
                "techniques": [
                  "H44"
                ]
              },
              "4.1.2": {
                "techniques": [
                  "H44",
                  "H91"
                ]
              }
            }
          },
          "tags": [
            "form",
            "content"
          ],
          "options": {
            "selector": "input[type=text]"
          }
        }
      };
      testfiles.forEach(function (filename) {
        self
          .client
          .executeAsync(function (filename, finish) {

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

          }, filename, function (err, ret) {
            if (err) {
              done(err);
              return;
            }
            tests = ret && JSON.parse(ret.value) || {};
          });
      });

      // Run the Quail tests.
      this.client
        .executeAsync(function (tests, finish) {
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
        }, tests, function (err, ret) {
          if (err) {
            done(err);
            return;
          }
          if (ret && ret.value) {
            self.results = JSON.parse(ret.value);
          }
        });

      // Check the page for JavaScript errors. If any errors exist, close
      // testing and report the error, otherwise return control to the test
      // suite.
      this.client
        .execute(function () {
          return window.jsErrors;
        }, function (err, ret) {
          var pageErrors = ret && ret.value;
          if (pageErrors.length > 0) {
            self
              .client
              .end(function () {
                if (httpServerInstance) {
                  httpServerInstance.close();
                }
                process.exit('JavaScript errors on the page halted evaluation\n\n' + ret.value.join('\n'));
              });
          }
          else {
            done();
          }
        });
    };
  }
};
