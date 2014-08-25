/**
 * Success Criterion 3.2.3: Consistent navigation
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-consistent-locations.html
 */
quail.guidelines.wcag.successCriteria['3.2.3'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G61': 'Presenting repeated components in the same relative order each time they appear'
  };

  // Failures
  sc.failures = {
    'F66': 'Presenting navigation links in a different relative order on different pages'
  };

  // The tests that must be run in order to evaluate this Success Criteria.
  var requiredTests = [];
  // The set of tests that were run that pertain to this Success Criteria. This
  // will be the union of the tests that were run and the required tests.
  var criteriaTests = [];

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  /**
   * Evaluates the Success Criteria.
   */
  function evaluator(tests) {
    criteriaTests = sc.filterTests(tests, requiredTests);
    // If the length of the union equals the length of the required tests,
    // then we have the necessary tests to evaluate this success criteria.
    if (criteriaTests.length === requiredTests.length) {

    }
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.2.3',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
