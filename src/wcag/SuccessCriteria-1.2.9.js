/**
 * Success Criterion 1.2.9: Audio-only (Live)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-live-audio-only.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP1G2C9 = (function () {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:1.2.9',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
}());

module.exports = SuccessCriteriaP1G2C9;
