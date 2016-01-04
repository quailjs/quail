describe('assessment: documentLangNotIdentified', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  describe('the no lang case', function () {
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/documentLangNotIdentified/documentLangNotIdentified-fail.html',
          assessments: [
            'documentLangNotIdentified'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.documentLangNotIdentified.cases;
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
      expect(quailResults.tests).to.include.keys('documentLangNotIdentified');
    });

    it('should return the proper assessment for assert-1', function () {
      expect(cases[0]).to.have.quailStatus('failed');
    });
  });

  // Evaluate the test page with Quail.
  describe('the lang case', function () {
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/documentLangNotIdentified/documentLangNotIdentified-pass.html',
          assessments: [
            'documentLangNotIdentified'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.documentLangNotIdentified.cases;
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
      expect(quailResults.tests).to.include.keys('documentLangNotIdentified');
    });

    it('should return the proper assessment for assert-1', function () {
      expect(cases[0]).to.have.quailStatus('passed');
    });
  });
});
