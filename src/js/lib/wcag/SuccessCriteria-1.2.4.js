/**
 * Success Criterion 1.2.4: Captions (live)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-real-time-captions.html
 */
quail.guidelines.wcag.successCriteria['1.2.4'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G9': 'Creating captions for live synchronized media',
    // AND
    'G93': 'Providing open (always visible) captions',
    'G87': 'Providing closed captions using any readily available media format that has a video player that supports closed captioning'
  };

  // Failures
  sc.failures = {};

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
    'name': 'wcag:1.2.4',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
