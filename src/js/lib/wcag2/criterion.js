quail.lib.wcag2.Criterion = (function () {

  // Provide default values for the assert objects
  function aggregateParts(parts, defaultResult) {
    var getResultPriority = quail.lib.wcag2.EarlAssertion.getResultPriority;
    var outcome = {result: defaultResult};

    $.each(parts, function (i, part) {
      if (getResultPriority(outcome) < getResultPriority(part)) {
        outcome.result = part.outcome.result;
      }
    });
    return outcome;
  }


  function constructor (data, testDefinitions, preconditionDefinitions) {
    var testClusters = [];
    var criterion = {};
    var defaultResult = data['default'] || 'untested';
    var id = data.id;

    // Create a testCluster object for each cluster (if any)
    if ($.isArray(data.testClusters)) {
      testClusters = $.map(data.testClusters, function (clusterConf) {
        return new quail.lib.wcag2.TestCluster(
          clusterConf, testDefinitions
        );
      });
    }

    // Create a precondition test
    if ($.isArray(data.preconditions)) {
      var preconditionTest = {
        passed: 'inapplicable',
        failed: 'cantTell',
        type: 'stacking', // If any of it's content is found it should return cantTell
        tests: data.preconditions
      };
      // Add a test cluster for the precondition tests
      testClusters.push(new quail.lib.wcag2.TestCluster(
        preconditionTest, preconditionDefinitions
      ));
    }


    criterion.getResult = function (data) {
      var result;
      var parts = [];

      $.each(testClusters, function (i, cluster) {
        var part = cluster.getResults(data);
        parts.push.apply(parts, part);
      });
      result = new quail.lib.wcag2.EarlAssertion({
        testRequirement: id,
        outcome: aggregateParts(parts, defaultResult)
      });
      if (parts.length > 0) {
        result.hasPart = parts;
      }
      return result;
    };

    /**
     * Get an array of test used in this criterion
     * @param  {[json]} criteria
     * @return {[array]}
     */
    criterion.getTests = function () {
      var tests = [];
      $.each(testClusters, function (i, cluster) {
        tests.push.apply(tests, cluster.tests);
      });
      return tests;
    };

    return criterion;
  }

  return constructor;

}());
