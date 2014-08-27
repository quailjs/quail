/**
 * Success Criterion 3.1.1: Language of Page
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-doc-lang-id.html
 */
quail.guidelines.wcag.successCriteria['3.1.1'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.1.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
