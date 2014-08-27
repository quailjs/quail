/**
 * Success Criterion 2.2.3: No Timing
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html
 */
quail.guidelines.wcag.successCriteria['2.2.3'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:2.2.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
