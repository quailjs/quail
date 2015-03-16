describe('assessment: aLinkTextDoesNotBeginWithRedundantWord', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/aLinkTextDoesNotBeginWithRedundantWord/aLinkTextDoesNotBeginWithRedundantWord.html',
        assessments: [
          'aLinkTextDoesNotBeginWithRedundantWord'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
        cases = quailResults.tests['aLinkTextDoesNotBeginWithRedundantWord'].cases;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct stats', function () {
    expect(quailResults.stats.tests).to.equal(1);
    expect(quailResults.stats.cases).to.equal(4);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('aLinkTextDoesNotBeginWithRedundantWord');
  });

  it('should pass a link without redundant text', function () {
    expect(cases).quailGetById('assert-1').to.have.quailStatus('passed');
  });

  it('should pass a link without redundant text in the img alt', function () {
    expect(cases).quailGetById('assert-2').to.have.quailStatus('passed');
  });

  it('should fail a link with redundant text', function () {
    expect(cases).quailGetById('assert-3').to.have.quailStatus('failed');
  });

  it('should fail a link with redundant text in the img alt', function () {
    expect(cases).quailGetById('assert-4').to.have.quailStatus('failed');
  });
});
