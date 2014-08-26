/**
 * Success Criterion 2.4.1: Bypass blocks
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
 */
quail.guidelines.wcag.successCriteria['2.4.1'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:2.4.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G1': 'Adding a link at the top of each page that goes directly to the main content area',
    'G123': 'Adding a link at the beginning of a block of repeated content to go to the end of the block',
    'G124': 'Adding links at the top of the page to each area of the content',
    'H69': 'Providing heading elements at the beginning of each section of content',
    'H70': 'Using frame elements to group blocks of repeated material AND H64: Using the title attribute of the frame and iframe elements',
    'SCR28': 'Using an expandable and collapsible menu to bypass block of content'
  };

  // Failures
  sc.failures = {};

  return sc;
}(quail));
