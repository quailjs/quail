/**
 * Success Criterion 1.2.9: Audio-only (Live)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-live-audio-only.html
 */
quail.guidelines.wcag.successCriteria['1.2.9'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.2.9',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
