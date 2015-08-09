describe('assessment: linkHasAUniqueContext', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/linkHasAUniqueContext/linkHasAUniqueContext.html',
        assessments: [
          'linkHasAUniqueContext'
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
    expect(quailResults.stats.cases).to.equal(36);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('linkHasAUniqueContext');
  });

  it('should return the proper assessment for assert-1', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-1').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-2', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-2').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-3', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-3').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-4', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-4').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-5', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-5').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-6', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-6').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-7', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-7').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-8', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-8').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-9', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-9').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-10', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-10').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-11', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-11').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-12', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-12').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-13', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-13').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-14', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-14').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-15', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-15').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-16', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-16').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-17', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-17').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-18', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-18').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-19', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-19').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-20', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-20').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-21', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-21').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-22', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-22').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-23', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-23').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-24', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-24').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-25', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-25').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-26', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-26').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-27', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-27').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-28', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-28').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-29', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-29').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-30', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-30').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-31', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-31').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-32', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-32').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-33', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-33').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-34', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-34').to.have.quailStatus('failed');
  });
  it('should return the proper assessment for assert-35', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-35').to.have.quailStatus('passed');
  });
  it('should return the proper assessment for assert-36', function () {
    cases = quailResults.tests.linkHasAUniqueContext.cases;
    expect(cases).quailGetById('assert-36').to.have.quailStatus('passed');
  });
});
