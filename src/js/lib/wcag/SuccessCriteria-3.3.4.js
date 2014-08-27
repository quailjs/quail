/**
 * Success Criterion 3.3.4: Error Prevention (Legal, Financial, Data)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-reversible.html
 */
quail.guidelines.wcag.successCriteria['3.3.4'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.3.4',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
