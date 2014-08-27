/**
 * Success Criterion 2.3.2: Three Flashes
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-three-times.html
 */
quail.guidelines.wcag.successCriteria['2.3.2'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:2.3.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
