/**
 * Success Criterion 2.2.5: Re-authenticating
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-server-timeout.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP2G2C5 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.2.5',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP2G2C5;
