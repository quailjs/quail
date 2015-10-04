var jQuery = require('jquery');

var Criterion = (function () {

  // Provide default values for the assert objects
  function aggregateParts (parts, defaultResult) {
    var getResultPriority = wcag2.EarlAssertion.getResultPriority;
    var outcome = {result: defaultResult};

    jQuery.each(parts, function (i, part) {
      if (getResultPriority(outcome) < getResultPriority(part)) {
        outcome.result = part.outcome.result;
      }
    });
    return outcome;
  }

  function constructor (data, testDefinitions, preconditionDefinitions, subject) {
    var testAggregators = [];
    var criterion = {};
    var defaultResult = data['default'] || 'untested';
    var id = data.id;

    // Create a TestAggregator object for each aggregator (if any)
    if (jQuery.isArray(data.testAggregators)) {
      testAggregators = jQuery.map(data.testAggregators, function (aggregateConf) {
        return new wcag2.TestAggregator(
          aggregateConf, testDefinitions, subject
        );
      });
    }

    // Create a precondition test
    if (jQuery.isArray(data.preconditions)) {
      var preconditionTest = {
        type: 'stacking', // If any of it's content is found it should return cantTell
        tests: data.preconditions
      };
      // Add a test aggregator for the precondition tests
      testAggregators.push(new wcag2.TestAggregator(
        preconditionTest, preconditionDefinitions, subject
      ));
    }

    criterion.getResult = function (data) {
      var result;
      var parts = [];

      jQuery.each(testAggregators, function (i, aggregator) {
        var part = aggregator.getResults(data);
        parts.push.apply(parts, part);
      });
      result = new wcag2.EarlAssertion({
        testRequirement: id,
        outcome: aggregateParts(parts, defaultResult),
        subject: subject
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
      jQuery.each(testAggregators, function (i, aggregator) {
        tests.push.apply(tests, aggregator.tests);
      });
      return tests;
    };

    return criterion;
  }

  return constructor;

}());

module.exports = Criterion;
