/**
 * Success Criterion 2.2.2: Pause, Stop, Hide
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html
 */
var SuccessCriteria = require('SuccessCriteria');

quail.guidelines.wcag.successCriteria['2.2.2'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.2.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}(quail));
