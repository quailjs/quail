/**
 * Success Criterion 2.3.1: Three Flashes or Below Threshold
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP2G3C1 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.3.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP2G3C1;
