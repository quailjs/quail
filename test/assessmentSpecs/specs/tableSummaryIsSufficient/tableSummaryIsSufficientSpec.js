describe('assessment: tableSummaryIsSufficient', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  describe('the non-match case', function () {
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/tableSummaryIsSufficient/tableSummaryIsSufficient-nomatch.html',
          assessments: [
            'tableSummaryIsSufficient'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.tableSummaryIsSufficient.cases;
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
      expect(quailResults.tests).to.include.keys('tableSummaryIsSufficient');
    });

    it('should return the proper assessment for the test', function () {
      expect(cases[0]).to.have.quailStatus('passed');
    });
  });

  // Evaluate the test page with Quail.
  describe('the match case', function () {
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/tableSummaryIsSufficient/tableSummaryIsSufficient.html',
          assessments: [
            'tableSummaryIsSufficient'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.tableSummaryIsSufficient.cases;
        });
    });

    after('end the webdriver session', function () {
      return quailTestRunner.teardown(client);
    });

    it('should return the correct number of tests', function () {
      expect(quailResults.stats.tests).to.equal(1);
    });
    it('should return the correct number of cases', function () {
      expect(quailResults.stats.cases).to.equal(0);
    });

    it('should have correct key under the test results', function () {
      expect(quailResults.tests).to.include.keys('tableSummaryIsSufficient');
    });

    it('should return the proper assessment for assert-1', function () {
      expect(cases).quailGetById('assert-1').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-2', function () {
      expect(cases).quailGetById('assert-2').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-3', function () {
      expect(cases).quailGetById('assert-3').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-4', function () {
      expect(cases).quailGetById('assert-4').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-5', function () {
      expect(cases).quailGetById('assert-5').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-6', function () {
      expect(cases).quailGetById('assert-6').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-7', function () {
      expect(cases).quailGetById('assert-7').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-8', function () {
      expect(cases).quailGetById('assert-8').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-9', function () {
      expect(cases).quailGetById('assert-9').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-10', function () {
      expect(cases).quailGetById('assert-10').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-11', function () {
      expect(cases).quailGetById('assert-11').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-12', function () {
      expect(cases).quailGetById('assert-12').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-13', function () {
      expect(cases).quailGetById('assert-13').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-14', function () {
      expect(cases).quailGetById('assert-14').to.have.quailStatus('failed');
    });
    it('should return the proper assessment for assert-15', function () {
      expect(cases).quailGetById('assert-15').to.have.quailStatus('failed');
    });
  });
});
