/**
 * Success Criterion 3.3.3: Error suggestions
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-suggestions.html
 */
quail.guidelines.wcag.successCriteria['3.3.3'] = (function (quail) {

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

    var requiredAttrs = [{
      'required': 'required'
    },
    {
      'aria-required': 'true'
    }];

    // Searches this for complex for types.
    //
    // @return boolean
    //    Whether the complex input type exists in the scoped DOM element.
    function hasComplexTypes (type) {
      return !!this.querySelectorAll('[type="' + type + '"]').length;
    }

    function hasTypesWithAttr (attr) {
      var key = Object.keys(attr)[0];
      return !!this.querySelectorAll('[' + key + '="' + attr[key] + '"]').length;
    }


    // Testing forms.
    //
    // If any of the complex form types are present in the document, this
    // success criteria applies.
    if (document.querySelectorAll('form').length) {
      if (complexInputTypes.some(hasComplexTypes, document) ||
        requiredAttrs.some(hasTypesWithAttr, document)
      ) {
        return true;
      }
    }
    else {
      return false;
    }
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:3.3.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    // Required fields
    'G83': 'Providing text descriptions to identify required fields that were not completed',
    'ARIA2': 'Identifying a required field with the aria-required property',
    // Field that requires specific data formats
    'ARIA18': 'Using aria-alertdialog to Identify Errors (ARIA)',
    'G85': 'Providing a text description when user input falls outside the required format or values',
    'G177': 'Providing suggested correction text',
    'SCR18': 'Providing client-side validation and alert (Scripting)',
    'SCR32': 'Providing client-side validation and adding error text via the DOM (Scripting)',
    // Field with limited set of values
    // 'ARIA18': 'Using aria-alertdialog to Identify Errors (ARIA)',
    'G84': 'Providing a text description when the user provides information that is not in the list of allowed values'
    // 'G177': 'Providing suggested correction text',
    // 'SCR18': 'Providing client-side validation and alert (Scripting)',
    // 'SCR32': 'Providing client-side validation and adding error text via the DOM (Scripting)'
  };

  // Failures
  sc.failures = {};

  return sc;
}(quail));
