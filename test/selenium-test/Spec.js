var chai = require('chai');
var webdriver = require('selenium-webdriver' );
var FIXTURE = 'http://localhost:9000/index.html';
var expect = chai.expect;
var should = chai.should();

/**
 * creates a webdriver client
 * @param callBack or promise
 */
function createClient (callBack) {
  var serverConfig = 'http://127.0.0.1:4444/wd/hub';
  var capabilities = {
    silent: true, // maybe output more for tests?
    browserName: 'phantomjs',
    javascriptEnabled: true,
    takesScreenshot: true,
    databaseEnabled: false,
    cssSelectorsEnabled:true,
    webStorageEnabled: true
  };

  var driver = new webdriver
    .Builder()
    .usingServer(serverConfig)
    .withCapabilities(capabilities)
    .build();

  if (typeof callBack === 'function') {
    return callBack (driver);
  }
  else if ( typeof callBack === 'object' && typeof callBack.resolve === 'function' ) {
    return callBack.resolve(driver);
  }
  else {
    return driver;
  }
}

describe('The driver', function () {
  var _driver;
  beforeEach(function () {
    createClient(function (driver) {
      _driver = driver;
    });
  });
  afterEach(function () {
    _driver.quit();
  });

  it('exists', function () {
    expect(_driver).to.exist;
  });
});
