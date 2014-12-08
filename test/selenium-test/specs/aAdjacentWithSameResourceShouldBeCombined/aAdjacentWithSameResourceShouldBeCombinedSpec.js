describe('assessment: aAdjacentWithSameResourceShouldBeCombined', function () {
  var client, assessments, quailResults;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/aAdjacentWithSameResourceShouldBeCombined/aAdjacentWithSameResourceShouldBeCombined.html',
        assessments: [
          'aAdjacentWithSameResourceShouldBeCombined'
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

  it('should return the correct stats', function () {
    expect(quailResults.stats.tests).to.equal(1);
    expect(quailResults.stats.cases).to.equal(4);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('aAdjacentWithSameResourceShouldBeCombined');
  });

  it('should return the proper assessment for the test', function () {
    expect(quailResults.tests['aAdjacentWithSameResourceShouldBeCombined'].cases).to.deep.equal([{
      "status": "inapplicable",
      "selector": "a[href=\"products.html\"]",
      "html": "<a href=\"products.html\"><img src=\"../assets/go.gif\" alt=\"\">Products page</a>"
    }, {
      "status": "passed",
      "selector": "a[href=\"products.html\"]",
      "html": "<a href=\"products.html\"><img src=\"../assets/go.gif\" alt=\"\">Products page</a>"
    }, {
      "status": "failed",
      "selector": "a[href=\"products.html\"]",
      "html": "<a href=\"products.html\"><img src=\"../assets/go.gif\" alt=\"\"></a>"},
    {
      "status": "failed",
      "selector": "a[href=\"products.html\"]",
      "html": "<a href=\"products.html\"><img src=\"../assets/go.gif\" alt=\"Products page\"></a>"
    }]);
  });
});
