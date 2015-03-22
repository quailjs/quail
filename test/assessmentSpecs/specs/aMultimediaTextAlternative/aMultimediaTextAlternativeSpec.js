describe('assessment: aMultimediaTextAlternative', function () {
  var client, assessments, quailResults, cases;

  describe('no links to media', function () {
    // Evaluate the test page with Quail.
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/aMultimediaTextAlternative/aMultimediaTextAlternative-inapplicable.html',
          assessments: [
            'aMultimediaTextAlternative'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.aMultimediaTextAlternative.cases;
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
      expect(quailResults.tests).to.include.keys('aMultimediaTextAlternative');
    });

    it('should return the proper assessment for the test', function () {
      expect(cases[0]).to.have.quailStatus('inapplicable');
    });
  });

  describe('links to media', function () {
    // Evaluate the test page with Quail.
    before('load webdrivers and run evaluations with Quail', function () {
      return quailTestRunner.setup({
          url: 'http://localhost:9999/aMultimediaTextAlternative/aMultimediaTextAlternative.html',
          assessments: [
            'aMultimediaTextAlternative'
          ]
        })
        .spread(function (_client_, _assessments_, _quailResults_) {
          client = _client_;
          assessments = _assessments_;
          quailResults = _quailResults_;
          cases = quailResults.tests.aMultimediaTextAlternative.cases;
        });
    });

    after('end the webdriver session', function () {
      return quailTestRunner.teardown(client);
    });

    it('should return the correct number of tests', function () {
      expect(quailResults.stats.tests).to.equal(1);
    });
    it('should return the correct number of cases', function () {
      expect(quailResults.stats.cases).to.equal(15);
    });

    it('should have correct key under the test results', function () {
      expect(quailResults.tests).to.include.keys('aMultimediaTextAlternative');
    });

    it('should return the proper assessment for a file link of type .aif, \(assert-1\)', function () {
      expect(cases).quailGetById('assert-1').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .iff, \(assert-2\)', function () {
      expect(cases).quailGetById('assert-2').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .mov, \(assert-3\)', function () {
      expect(cases).quailGetById('assert-3').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .mp3, \(assert-4\)', function () {
      expect(cases).quailGetById('assert-4').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .mpg, \(assert-5\)', function () {
      expect(cases).quailGetById('assert-5').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .ram, \(assert-6\)', function () {
      expect(cases).quailGetById('assert-6').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .sam, \(assert-7\)', function () {
      expect(cases).quailGetById('assert-7').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .smp, \(assert-8\)', function () {
      expect(cases).quailGetById('assert-8').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .snd, \(assert-9\)', function () {
      expect(cases).quailGetById('assert-9').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .svx, \(assert-10\)', function () {
      expect(cases).quailGetById('assert-10').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .pcm, \(assert-11\)', function () {
      expect(cases).quailGetById('assert-11').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .vce, \(assert-12\)', function () {
      expect(cases).quailGetById('assert-12').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .vox, \(assert-13\)', function () {
      expect(cases).quailGetById('assert-13').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .wav, \(assert-14\)', function () {
      expect(cases).quailGetById('assert-14').to.have.quailStatus('cantTell');
    });
    it('should return the proper assessment for a file link of type .wmv, \(assert-15\)', function () {
      expect(cases).quailGetById('assert-15').to.have.quailStatus('cantTell');
    });
  });
});
