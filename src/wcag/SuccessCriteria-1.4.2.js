/**
 * Success Criterion 1.4.2: Audio control
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-dis-audio.html
 */
var SuccessCriteria = require('SuccessCriteria');

var SuccessCriteriaP1G4C2 = (function () {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator () {
    // This criteria applies if any media objects exist on the page. It's a
    // very crude preEvaluator, to be fair.
    return !!$('audio, video, object, embed').length;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:1.4.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    G60: 'Playing a sound that turns off automatically within three seconds',
    G170: 'Providing a control near the beginning of the Web page that turns off sounds that play automatically',
    G171: 'Playing sounds only on user request'
  };

  // Failures
  sc.failures = {
    F23: 'Playing a sound longer than 3 seconds where there is no mechanism to turn it off'
  };

  return sc;
}());

module.exports = SuccessCriteriaP1G4C2;
