var chai = require('chai');
var driverFactory = require('./node_modules/driverFactory/driverFactory');
var FIXTURE = 'http://localhost:9000/index.html';
var expect = chai.expect;
var should = chai.should();

describe('The driver', function () {
  var _driver;
  beforeEach(function () {
    driverFactory.createClient(function (driver) {
      _driver = driver;
    });
  });
  afterEach(function () {
    _driver.quit();
  });

  it('exists', function (done) {
    expect(_driver).to.exist;
    _driver.getPageSource().then(function (source) {
      console.log(source);
      done();
    });
  });
});
