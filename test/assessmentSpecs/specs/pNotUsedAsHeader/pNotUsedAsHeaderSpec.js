describe('assessment: pNotUsedAsHeader', function () {
  var client, assessments, quailResults, cases;

  // Evaluate the test page with Quail.
  before('load webdrivers and run evaluations with Quail', function () {
    return quailTestRunner.setup({
        url: 'http://localhost:9999/pNotUsedAsHeader/pNotUsedAsHeader.html',
        assessments: [
          'pNotUsedAsHeader'
        ]
      })
      .spread(function (_client_, _assessments_, _quailResults_) {
        client = _client_;
        assessments = _assessments_;
        quailResults = _quailResults_;
        cases = quailResults.tests.pNotUsedAsHeader.cases;
      });
  });

  after('end the webdriver session', function () {
    return quailTestRunner.teardown(client);
  });

  it('should return the correct stats', function () {
    expect(quailResults.stats.tests).to.equal(1);
    expect(quailResults.stats.cases).to.equal(28);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('pNotUsedAsHeader');
  });

  it('should recognize b inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-b').to.have.quailStatus('failed');
  });

  it('should recognize i inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-i').to.have.quailStatus('failed');
  });

  it('should recognize u inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-u').to.have.quailStatus('failed');
  });

  it('should recognize font inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-font').to.have.quailStatus('failed');
  });

  it('should recognize em inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-em').to.have.quailStatus('failed');
  });

  it('should recognize strong inside paragraph', function () {
    expect(cases).quailGetById('paragraph-with-strong').to.have.quailStatus('passed');
  });

  it('should pass single sentence paragraphs', function () {
    expect(cases).quailGetById('single-sentence-paragraph').to.have.quailStatus('passed');
  });

  it('should pass regular paragraphs with bold text', function () {
    expect(cases).quailGetById('regular-bold-paragraph').to.have.quailStatus('passed');
  });

  it('should pass regular paragraphs', function () {
    expect(cases).quailGetById('regular-paragraph').to.have.quailStatus('passed');
  });

  it('should pass a p tag in a blockquote', function () {
    expect(cases).quailGetById('paragraph-in-block-quote').to.have.quailStatus('passed');
  });
  it('should pass a p tag in a table', function () {
    expect(cases).quailGetById('paragraph-in-a-table').to.have.quailStatus('passed');
  });
  it('should pass a p tag following a p tag in a table', function () {
    expect(cases).quailGetById('paragraph-following-a-table').to.have.quailStatus('passed');
  });
});
