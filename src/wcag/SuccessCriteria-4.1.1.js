/**
 * Success Criterion 4.1.1: Parsing
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-parses.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP4G1C1 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:4.1.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP4G1C1;
