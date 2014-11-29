#!/usr/bin/env node

'use strict';

var selenium = require('selenium-standalone');

var spawnOptions = {
  stdio: 'pipe'
};

// options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [
  //'-debug'
];

var server = selenium(spawnOptions, seleniumArgs);

server.stdout.on('data', function(output) {
  console.log(output);
});

function close () {
  //server.kill();
  process.exit();
}

var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('http://www.google.com')
    .title(function(err, res) {
        console.log('Title was: ' + res.value);
    })
    .end(close);
