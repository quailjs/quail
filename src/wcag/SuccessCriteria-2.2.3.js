/**
 * Success Criterion 2.2.3: No Timing
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP2G2C3 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.2.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP2G2C3;
