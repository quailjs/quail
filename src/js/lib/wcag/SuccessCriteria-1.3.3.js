/**
 * Success Criterion 1.3.3: Sensory characteristics
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-understanding.html
 */
quail.guidelines.wcag.successCriteria['1.3.3'] = (function (quail) {
  var sc;

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
    'name': 'wcag:1.3.3',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
