/**
 * Success Criterion 3.2.1: On focus
 *
 * @see http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-receive-focus
 */
quail.guidelines.wcag.successCriteria['3.2.1'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.2.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G107': 'Using "activate" rather than "focus" as a trigger for changes of context'
  };

  // Failures
  sc.failures = {
    'F52': 'Opening a new window as soon as a new page is loaded',
    'F55': 'Using script to remove focus when focus is received'
  };

  return sc;
}(quail));
