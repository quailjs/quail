/**
 * Success Criterion 2.2.4: Interruptions
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP2G2C4 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.2.4',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP2G2C4;
