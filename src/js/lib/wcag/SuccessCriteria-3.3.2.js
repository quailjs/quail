/**
 * Success Criterion 3.3.2: Labels or Instructions
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html
 */
quail.guidelines.wcag.successCriteria['3.3.2'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.3.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
