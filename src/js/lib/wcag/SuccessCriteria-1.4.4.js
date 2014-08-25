/**
 * Success Criterion 1.4.4: Resize text
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html
 */
quail.guidelines.wcag.successCriteria['1.4.4'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G142': 'Using a technology that has commonly-available user agents that support zoom',
    'C12': 'Using percent for font sizes',
    'C13': 'Using named font sizes',
    'C14': 'Using em units for font, sizes',
    'SCR34': 'Calculating size and ,position in a way that scales with text size (Scripting)',
    'G146': 'Using liquid layout',
    'G178': 'Providing controls on the Web page that allow users to incrementally change the size of all text on the page up to 200 percent',
    'G179': 'Ensuring that there is no loss of content or functionality when the text resizes and text containers do not change their width'
  };

  // Failures
  sc.failures = {
    'F69': 'Resizing visually rendered text up to 200 percent causes the text, image or controls to be clipped, truncated or obscured',
    'F80': 'Text-based form controls do not resize when visually rendered text is resized up to 200%'
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
    'name': 'wcag:1.4.4',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
