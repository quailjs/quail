/**
 * Success Criterion 2.4.1: Bypass blocks
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
 */
quail.guidelines.wcag.successCriteria['2.4.1'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G1': 'Adding a link at the top of each page that goes directly to the main content area',
    'G123': 'Adding a link at the beginning of a block of repeated content to go to the end of the block',
    'G124': 'Adding links at the top of the page to each area of the content',
    'H69': 'Providing heading elements at the beginning of each section of content',
    'H70': 'Using frame elements to group blocks of repeated material AND H64: Using the title attribute of the frame and iframe elements',
    'SCR28': 'Using an expandable and collapsible menu to bypass block of content'
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
    'name': 'wcag:2.4.1',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
