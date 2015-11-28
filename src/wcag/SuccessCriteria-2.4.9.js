/**
 * Success Criterion 2.4.9: Link Purpose (Link Only)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-link.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP2G4C9 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.4.9',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP2G4C9;
