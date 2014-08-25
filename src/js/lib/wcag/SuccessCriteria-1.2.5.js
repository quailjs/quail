/**
 * Success Criterion 1.2.5: Audio description (pre-recorded)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-audio-desc-only.html
 */
quail.guidelines.wcag.successCriteria['1.2.5'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G78': 'Providing a second, user-selectable, audio track that includes audio descriptions',
    // OR
    'G173': 'Providing a version of a movie with audio descriptions',
    // OR
    'SC1.2.8': 'Providing a movie with extended audio descriptions',
    'G8': 'Providing a movie with extended audio descriptions',
    // OR if a talking head video
    'G203': 'Using a static text alternative to describe a talking head video'
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
    'name': 'wcag:1.2.5',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
