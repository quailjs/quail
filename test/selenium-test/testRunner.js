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

function exit () {
  process.exit();
}

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
  logLevel: 'verbose'
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

      this.client
        .url(url)
        .timeoutsAsyncScript(5000)
        .execute(function () {
          window.jsErrors = [];

          window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
            var report = 'Error: ' + errorMsg +
              ' Script: ' + url +
              ' Line: ' + lineNumber +
              ' Column: ' + column +
              ' StackTrace: ' +  errorObj;
            window.jsErrors.push(report);
          }
        })
        .execute(function () {
          var _jQuery = function () {};
          _jQuery.fn = {};
          _jQuery.expr = {};
          window.jQuery = _jQuery;
        })
        .executeAsync(function (finish) {

          var intervalId;
          var tries = 220;

          function loadError (oError) {
            finish('Failed to load the file: ' + oError);
          }

          function loadSuccess () {
            intervalId = setInterval(function () {
              if (window.quail) {
                clearInterval(intervalId);
                finish(window.quail);
              }
              else {
                tries--;
                if (tries <= 0) {
                  clearInterval(intervalId);
                  finish("Failed to boot up Quail");
                }
              }
            }, 20);
          }

          var s;
          var domel = document.getElementsByTagName("head")[0];
          // Append scripts.
          s = document.createElement("script");
          s.type = "text/javascript"
          s.src = "http://localhost:8888/quail.jquery.js";
          s.onerror = loadError;
          s.onload = loadSuccess;
          if (domel) domel.appendChild(s, domel);
        }, function (err, ret) {
          console.log(ret && ret.value || 'no value to log');
        })
        .execute(function () {
          return window.jsErrors;
        }, function (err, ret) {
          console.log(ret && ret.value && ret.value.length && ret.value.join('\n'));
          done();
        });
    };
  }
};
