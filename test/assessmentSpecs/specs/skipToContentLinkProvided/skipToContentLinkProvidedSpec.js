describe('assessment: skipToContentLinkProvided', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/skipToContentLinkProvided/skipToContentLinkProvided.html',
        assessments: [
          'skipToContentLinkProvided'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct number of tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });
  it('should return the correct number of cases', function () {
    expect(quailResults.stats.cases).to.equal(1);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('skipToContentLinkProvided');
  });

  it('should return the proper assessment for assert-1', function () {
    cases = quailResults.tests.skipToContentLinkProvided.cases;
    expect(cases).quailGetById('assert-1').to.have.quailStatus('passed');
  });
});

describe('assessment: skipToContentLinkProvided', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/skipToContentLinkProvided/skipToContentLinkProvided-pass-2.html',
        assessments: [
          'skipToContentLinkProvided'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct number of tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });
  it('should return the correct number of cases', function () {
    expect(quailResults.stats.cases).to.equal(1);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('skipToContentLinkProvided');
  });

  it('should return the proper assessment for assert-1', function () {
    cases = quailResults.tests.skipToContentLinkProvided.cases;
    expect(cases).quailGetById('assert-1').to.have.quailStatus('passed');
  });
});

describe('assessment: skipToContentLinkProvided', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/skipToContentLinkProvided/skipToContentLinkProvided-fail.html',
        assessments: [
          'skipToContentLinkProvided'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct number of tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });
  it('should return the correct number of cases', function () {
    expect(quailResults.stats.cases).to.equal(1);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('skipToContentLinkProvided');
  });

  it('should return the proper assessment for assert-1', function () {
    cases = quailResults.tests.skipToContentLinkProvided.cases;
    expect(cases[0]).to.have.quailStatus('failed');
  });
});

describe('assessment: skipToContentLinkProvided', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/skipToContentLinkProvided/skipToContentLinkProvided-fail-2.html',
        assessments: [
          'skipToContentLinkProvided'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct number of tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });
  it('should return the correct number of cases', function () {
    expect(quailResults.stats.cases).to.equal(1);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('skipToContentLinkProvided');
  });

  it('should return the proper assessment for assert-1', function () {
    cases = quailResults.tests.skipToContentLinkProvided.cases;
    expect(cases[0]).to.have.quailStatus('failed');
  });
});
