/**
 * Success Criterion 1.2.2: Captions (pre-recorded)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html
 */
quail.guidelines.wcag.successCriteria['1.2.2'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G93': 'Providing open (always visible) captions',
    // OR
    'G87': 'Providing closed captions'
  };

  // Failures
  sc.failures = {
    'F74': 'Not labeling a synchronized media alternative to text as an alternative',
    // OR
    'F75': 'Providing synchronized media without captions when the synchronized media presents more information than is presented on the page',
    // OR
    'F8': 'Captions omitting some dialogue or important sound effects'
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
    'name': 'wcag:1.2.2',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
