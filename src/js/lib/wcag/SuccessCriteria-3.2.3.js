/**
 * Success Criterion 3.2.3: Consistent navigation
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-consistent-locations.html
 */
quail.guidelines.wcag.successCriteria['3.2.3'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.2.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G61': 'Presenting repeated components in the same relative order each time they appear'
  };

  // Failures
  sc.failures = {
    'F66': 'Presenting navigation links in a different relative order on different pages'
  };

  return sc;
}(quail));
