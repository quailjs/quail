#!/usr/bin/env node

'use strict';

var selenium = require('selenium-standalone');
var Mocha = require('mocha');
var should = require('should');
var chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;
var glob = require('glob');
var client, specFiles;

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
      process.exit(failures);
    });
  });
});

var conf = {
  desiredCapabilities: {
      browserName: 'firefox'
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
    return function(done) {
      var wdjs = require('webdriverio');

      /**
       * if instance already exists and no new session was requested return existing instance
       */
      if (client && !newSession && newSession !== null) {
        this.client = client;

      /**
       * if new session was requested create temporary instance
       */
      }
      else if (newSession && newSession !== null) {
        this.client = wdjs.remote(conf).init();

      /**
       * otherwise store created intance for other specs
       */
      }
      else {
        this.client = client = wdjs.remote(conf).init();
      }

      this.client
        .url(url, done);
    };
  }
};
