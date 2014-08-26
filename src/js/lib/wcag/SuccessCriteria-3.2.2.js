/**
 * Success Criterion 3.2.2: On input
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html
 */
quail.guidelines.wcag.successCriteria['3.2.2'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.2.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G80': 'Providing a submit button to initiate a change of context',
    // AND
    'H32': 'Providing submit buttons',
    'H84': 'Using a button with a select element to perform an action',

    'G13': 'Describing what will happen before a change to a form control that causes a change of context to occur is made',
    'SCR19': 'Using an onchange event on a select element without causing a change of context'
  };

  // Failures
  sc.failures = {
    'F36': 'Automatically submitting a form and presenting new content without prior warning when the last field in the form is given a value',
    'F37': 'Launching a new window without prior warning when the status of a radio button, check box or select list is changed',
    'F76': 'Providing instruction material about the change of context by change of setting in a user interface element at a location that users may bypass'
  };

  return sc;
}(quail));
