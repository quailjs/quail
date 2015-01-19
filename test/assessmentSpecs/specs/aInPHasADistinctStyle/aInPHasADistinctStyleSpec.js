describe('assessment: aInPHasADistinctStyle', function () {
  var client, assessments, quailResults;

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

  it('should return the correct stats', function () {
    expect(quailResults.stats.tests).to.equal(1);
    expect(quailResults.stats.cases).to.equal(13);
  });

  it('should have correct key under the test results', function () {
    expect(quailResults.tests).to.include.keys('aInPHasADistinctStyle');
  });

  it('should return the proper assessment for the test', function () {
    expect(quailResults.tests['aInPHasADistinctStyle'].cases).to.deep.equal([
      {
        "html": "<a href=\"\">A link</a>",
        "selector": "a",
        "status": "inapplicable"
      },
      {
        "html": "<a href=\"/\" style=\"text-decoration:underline\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\" style=\"display:block; margin:1em;\"> With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\" style=\"position:absolute; top:-1em; right:0;\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\" style=\"border-bottom:dashed 1px red\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\">With a link <img src=\"\" alt=\"\"></a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\" style=\"text-decoration:underline\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\">With a link</a>",
        "selector": "a[href=\"/\"]",
        "status": "passed"
      },
      {
        "html": "<a href=\"/\" class=\"quail-failed-element\">With a link</a>",
        "selector": "a[href=\"/\"].quail-failed-element",
        "status": "failed"
      },
      {
        "html": "<a href=\"/\" class=\"quail-failed-element\">With a link</a>",
        "selector": "a[href=\"/\"].quail-failed-element",
        "status": "failed"
      }
    ]);

    expect(quailResults.tests['aInPHasADistinctStyle'].cases[0]).to.be.quailCase('inapplicable');
  });
});
