/**
 * Success Criterion 1.2.5: Audio description (pre-recorded)
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-audio-desc-only.html
 */
quail.guidelines.wcag.successCriteria['1.2.5'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.2.5',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G78': 'Providing a second, user-selectable, audio track that includes audio descriptions',
    // OR
    'G173': 'Providing a version of a movie with audio descriptions',
    // OR
    'SC1.2.8': 'Providing a movie with extended audio descriptions',
    'G8': 'Providing a movie with extended audio descriptions',
    // OR if a talking head video
    'G203': 'Using a static text alternative to describe a talking head video'
  };

  // Failures
  sc.failures = {};

  return sc;
}(quail));
