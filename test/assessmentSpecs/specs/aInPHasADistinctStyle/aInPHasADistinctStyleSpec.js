describe('assessment: aInPHasADistinctStyle', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/aInPHasADistinctStyle/aInPHasADistinctStyle.html',
        assessments: [
          'aInPHasADistinctStyle'
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
    expect(quailResults.stats.cases).to.equal(13);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('aInPHasADistinctStyle');
  });

  it('should return the proper assessment for the test', function () {
    cases = quailResults.tests.aInPHasADistinctStyle.cases;
    expect(cases).quailGetById('assert-1').to.have.quailStatus('inapplicable');
    // expect(cases).quailGetById('assert-2').to.have.quailStatus('passed');
    // expect(cases).quailGetById('assert-3').to.have.quailStatus('passed');
    // expect(cases).quailGetById('assert-4').to.have.quailStatus('passed');
    // expect(cases).quailGetById('assert-5').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-6').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-7').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-8').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-9').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-10').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-11').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-12').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-13').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-14').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-15').to.have.quailStatus('passed');
    expect(cases).quailGetById('assert-16').to.have.quailStatus('failed');
    expect(cases).quailGetById('assert-17').to.have.quailStatus('failed');
  });
});
