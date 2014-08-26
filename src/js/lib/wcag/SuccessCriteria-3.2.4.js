/**
 * Success Criterion 3.2.4: Consistent identification
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-consistent-functionality.html
 */
quail.guidelines.wcag.successCriteria['3.2.4'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.2.4',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G197': 'Using labels, names, and text alternatives consistently for content that has the same functionality AND following the sufficient techniques for Success Criterion 1.1.1 and sufficient techniques for Success Criterion 4.1.2 for providing labels, names, and text alternatives.'
  };

  // Failures
  sc.failures = {
    'F31': 'Using two different labels for the same function on different Web pages within a set of Web pages'
  };

  return sc;
}(quail));
