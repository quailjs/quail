/**
 * Success Criterion 1.4.5: Images of text
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-text-presentation.html
 */
quail.guidelines.wcag.successCriteria['1.4.5'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    // Check for image tags. If the page does not have any, then there is
    // nothing to test.
    return !!document.querySelectorAll('img, map').length;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.4.5',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'C22': 'Using CSS to control visual presentation of text (CSS)',
    'C30': 'Using CSS to replace text with images of text and providing user interface controls to switch',
    'G140': 'Separating information and structure from presentation to enable different presentations'
  };

  // Failures
  sc.failures = {};

  return sc;
}(quail));
