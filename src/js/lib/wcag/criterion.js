quail.lib.wcag2.Criterion = (function () {

  // Provide default values for the assert objects
  function aggregateParts(parts, defaultResult) {
    var getResultPriority = quail.lib.EarlAssertion.getResultPriority,
    outcome = {
      result: defaultResult
    };
    $.each(parts, function (i, part) {
      if (getResultPriority(outcome) < getResultPriority(part)) {
        outcome.result = part.outcome.result;
      }
    });
    return outcome;
  }


  function constructor (data, testDefinitions) {
    var testClusters = [],
    criterion = {},
    defaultResult = data['default'] || 'untested',
    id = data.id;

    // Create a testCluster object for each cluster (if any)
    if ($.isArray(data.testClusters)) {
      testClusters = $.map(data.testClusters, function (clusterConf) {
        return new quail.lib.wcag2.TestCluster(
          clusterConf, testDefinitions
        );
      });
    }


    criterion.getResult = function (data) {
      var result,
      parts = [];

      $.each(testClusters, function (i, cluster) {
        var part = cluster.getResults(data);
        parts.push.apply(parts, part);
      });
      result = new quail.lib.EarlAssertion({
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
