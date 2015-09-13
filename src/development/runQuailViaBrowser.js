// Basic output structure attributes.

var quail = require('quail');

var output = {
  tests: {},
  successCriteria: {},
  stats: {
    tests: 0,
    cases: 0
  }
};
quail.run({
  accessibilityTests: [window.assessmentName],
  html: jQuery('html'),
  // Called when an individual Case in a test is resolved.
  caseResolve: function (eventName, test, _case) {
    var name = test.get('name');
    if (!output.tests[name]) {
      output.tests[name] = {
        id: name,
        title: test.get('title'),
        description: test.get('description'),
        type: test.get('type'),
        testability: test.get('testability'),
        guidelines: test.get('guidelines') || {},
        tags: test.get('tags'),
        cases: []
      };
    }
    // Push the case into the results for this test.
    output.tests[name].cases.push({
      status: _case.get('status'),
      selector: _case.get('selector'),
      html: _case.get('html')
    });
    // Increment the cases count.
    output.stats.cases++;
  },
  // Called when all the Cases in a Test are resolved.
  testComplete: function () {
    // console.log('Finished testing ' + test.get('name') + '.');
    // Increment the tests count.
    output.stats.tests++;
  },
  // Called when all the Tests in a TestCollection are completed.
  testCollectionComplete: function (eventName, testCollection) {
    console.log(testCollection);
  }
});
