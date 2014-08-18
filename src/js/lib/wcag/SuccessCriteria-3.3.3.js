/**
 * Success Criterion 3.3.3: Error suggestions
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-suggestions.html
 */
quail.guidelines.wcag.successCriteria['3.3.3'] = (function (quail) {
  var sc;

  // The tests that must be run in order to evaluate this Success Criteria.
  var requiredTests = [];
  // The set of tests that were run that pertain to this Success Criteria. This
  // will be the union of the tests that were run and the required tests.
  var criteriaTests = [];

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    var complexInputTypes = [
      //'button', //  Defines a clickable button (mostly used with a JavaScript to activate a script)
      'checkbox', //  Defines a checkbox
      'color', // Defines a color picker
      'date', //  Defines a date control (year, month and day (no time))
      'datetime', //  Defines a date and time control (year, month, day, hour, minute, second, and fraction of a second, based on UTC time zone)
      'datetime-local', //  Defines a date and time control (year, month, day, hour, minute, second, and fraction of a second (no time zone)
      'email', // Defines a field for an e-mail address
      'file', //  Defines a file-select field and a "Browse..." button (for file uploads)
      'hidden', //  Defines a hidden input field
      //'image', // Defines an image as the submit button
      'month', // Defines a month and year control (no time zone)
      'number', //  Defines a field for entering a number
      'password', //  Defines a password field (characters are masked)
      'radio', // Defines a radio button
      'range', // Defines a control for entering a number whose exact value is not important (like a slider control)
      //'reset', // Defines a reset button (resets all form values to default values)
      'search', //  Defines a text field for entering a search string
      //'submit', //  Defines a submit button
      'tel', // Defines a field for entering a telephone number
      //'text', //  Default. Defines a single-line text field (default width is 20 characters)
      'time', //  Defines a control for entering a time (no time zone)
      'url', // Defines a field for entering a URL
      'week' //  Defines a week and year control (no time zone)
    ];
    // Testing forms.
    //
    // If any of the complex form types are present in the document, this
    // success criteria applies.
    if (document.querySelectorAll('form').length) {
      return complexInputTypes.some(function (type) {
        return !!document.querySelectorAll('[type="' + type + '"]').length;
      });
    }
    else {
      return false;
    }
  }

  /**
   * Evaluates the Success Criteria.
   */
  function evaluator(tests) {
    criteriaTests = sc.filterTests(tests, requiredTests);
    // If the length of the union equals the length of the required tests,
    // then we have the necessary tests to evaluate this success criteria.
    if (criteriaTests.length === requiredTests.length) {

    }
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.3.3',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
