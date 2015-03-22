describe('assessment: aLinksNotSeparatedBySymbols', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/aLinksNotSeparatedBySymbols/aLinksNotSeparatedBySymbols.html',
        assessments: [
          'aLinksNotSeparatedBySymbols'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
        cases = quailResults.tests.aLinksNotSeparatedBySymbols.cases;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct number of tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });
  it('should return the correct number of cases', function () {
    expect(quailResults.stats.cases).to.equal(6);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('aLinksNotSeparatedBySymbols');
  });

  it('should return the proper assessment for assert-1', function () {
    expect(cases).quailGetById('assert-1').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-2', function () {
    expect(cases).quailGetById('assert-2').to.have.quailStatus('inapplicable');
  });
  it('should return the proper assessment for assert-3', function () {
    expect(cases).quailGetById('assert-3').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-4', function () {
    expect(cases).quailGetById('assert-4').to.have.quailStatus('inapplicable');
  });
  it('should return the proper assessment for assert-5', function () {
    expect(cases).quailGetById('assert-5').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-6', function () {
    expect(cases).quailGetById('assert-6').to.have.quailStatus('inapplicable');
  });
});
