/**
 * Success Criterion 3.3.5: Help
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-context-help.html
 */
quail.guidelines.wcag.successCriteria['3.3.5'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.3.5',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
