/**
 * Success Criterion 1.2.2: Captions (pre-recorded)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html
 */
quail.guidelines.wcag.successCriteria['1.2.2'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.2.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G93': 'Providing open (always visible) captions',
    // OR
    'G87': 'Providing closed captions'
  };

  // Failures
  sc.failures = {
    'F74': 'Not labeling a synchronized media alternative to text as an alternative',
    // OR
    'F75': 'Providing synchronized media without captions when the synchronized media presents more information than is presented on the page',
    // OR
    'F8': 'Captions omitting some dialogue or important sound effects'
  };

  return sc;
}(quail));
