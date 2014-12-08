describe('assessment: aMustHaveTitle', function () {
  var client, assessments, quailResults;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/aMustHaveTitle/aMustHaveTitle.html',
        assessments: [
          'aMustHaveTitle'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
      });
  });

  it('should have a client', function () {
    expect(client).to.exist;
  });

  it('should have results', function () {
    expect(quailResults).to.exist;
  });

  it('should have tests', function () {
    expect(quailResults.stats.tests).to.equal(1);
  });

  it('should have cases', function () {
    expect(quailResults.stats.cases).to.equal(1);
    expect(quailResults.tests).to.include.keys('aMustHaveTitle');
    expect(quailResults.tests);
  });

  it('should return the proper assessment for the tests', function () {
    expect(quailResults.tests['aMustHaveTitle'].cases).to.deep.equal([{
      html: "<a href=\"dogs.html\" class=\"quail-failed-element\">information about dogs</a>",
      selector: "a[href=\"dogs.html\"].quail-failed-element",
      status: "failed"
    }]);
  });
});
