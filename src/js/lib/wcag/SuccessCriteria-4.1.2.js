/**
 * Test for WCAG success criterion 4.1.2: Name, Role, Value.
 */
quail.guidelines.wcag.successCriteria['4.1.2'] = (function (quail) {

  // The tests that must be run in order to evaluate this Success Criteria.
  // @todo, identify the complete set of required tests for this Success Criteria.
  // var requiredTests = ['labelsAreAssignedToAnInput', 'labelMustBeUnique', 'inputWithoutLabelHasTitle'];

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  /**
   * (Unused right now)
   *
   * Evaluates the Success Criteria.
   */
  // function evaluator(tests) {
  //   // The set of tests that were run that pertain to this Success Criteria. This
  //   // will be the union of the tests that were run and the required tests.
  //   var criteriaTests = sc.filterTests(tests, sc.requiredTests);
  //   // If the length of the union equals the length of the required tests,
  //   // then we have the necessary tests to evaluate this success criteria.
  //   if (criteriaTests.length === requiredTests.length) {
  //     // Find the tests to evaluate.
  //     var labelsAreAssignedToAnInput = tests.find('labelsAreAssignedToAnInput');
  //     var labelMustBeUnique = tests.find('labelMustBeUnique');
  //     var inputWithoutLabelHasTitle = tests.find('inputWithoutLabelHasTitle');

  //     // Cycle through the cases in the Success Criteria.
  //     sc.each(function (index, _case) {
  //       var conclusion = 'untested';

  //       if (_case.get('status') !== 'notTested') {
  //         var selector = _case.get('selector');
  //         if (selector) {

  //           // @dev, we'll look at each test individually for this selector.
  //           // Process 'labelsAreAssignedToAnInput'.
  //           var cases_labelsAreAssignedToAnInput = labelsAreAssignedToAnInput.findCasesBySelector(selector);
  //           // Process 'labelMustBeUnique'.
  //           var cases_labelMustBeUnique = labelMustBeUnique.findCasesBySelector(selector);
  //           // Process 'inputWithoutLabelHasTitle'.
  //           var cases_inputWithoutLabelHasTitle = inputWithoutLabelHasTitle.findCasesBySelector(selector);

  //           var passing = ['passed', 'inapplicable'];

  //           // Make sure the arrays are not empty.
  //           if ((cases_labelsAreAssignedToAnInput.length >= 1 && cases_labelsAreAssignedToAnInput[0].hasStatus(passing)) &&
  //             (cases_labelMustBeUnique.length >= 1 && cases_labelMustBeUnique[0].hasStatus(passing)) &&
  //             (cases_inputWithoutLabelHasTitle.length >= 1 && cases_inputWithoutLabelHasTitle[0].hasStatus(passing))) {
  //             conclusion = 'passed';
  //           }

  //           // Don't bother if it isn't passed?
  //           if (conclusion === 'passed') {
  //             // (1) Determine if any of the following failures apply to the element
  //             //   at the selector. If so, fail the Success Criteria for that selector.
  //             var element = cases_labelMustBeUnique[0].attributes.element;

  //             // F59: Using script to make div or span a user interface control in HTML without providing a role for the control (This failure may be solved in the future using DHTML roadmap techniques.)
  //             if (element.nodeName === 'DIV' || element.nodeName === 'SPAN') {
  //               conclusion = 'failed';
  //             }

  //             // F20: Not updating text alternatives when changes to non-text content occur
  //             // N/A for labelMustBeUnique.

  //             // F68: Association of label and user interface controls not being programmatically determined

  //             //   F79: Focus state of a user interface component not being programmatically determinable or no notification of change of focus state available
  //             //   F86: Not providing names for each part of a multi-part form field, such as a US telephone number
  //             //   F89: Using null alt on an image where the image is the only content in a link ( #59 :ok: )
  //             // (2) If no Failures are detected, so if the Techniques are satisfied. If
  //             //   one of the techniques is satisfed for the element at the selector,
  //             //   Success Criteria is satisfied.
  //             //
  //             //   ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used
  //             //   ARIA16: Using aria-labelledby to provide a name for user interface controls
  //             //
  //             //   G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes using technology-specific techniques below:
  //             //   AND
  //             //
  //             //   H91: Using HTML form controls and links ( #66 )
  //             //   H44: Using label elements to associate text labels with form controls
  //             //   H64: Using the title attribute of the frame and iframe elements ( #65 )
  //             //   H65: Using the title attribute to identify form controls when the label element cannot be used ( #64 )
  //             //   H88: Using HTML according to spec ( #86 )
  //           }
  //         }
  //       }
  //       // Add the case to the Success Criteria.
  //       sc.addConclusion(conclusion, _case);
  //     });
  //   }
  // }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:4.1.2',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'ARIA14': 'Using aria-label to provide an invisible label where a visible label cannot be used',
    'ARIA16': 'Using aria-labelledby to provide a name for user interface controls',
    'G108': 'Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes using technology-specific techniques below:',
    //AND
    'H91': 'Using HTML form controls and links',
    'H44': 'Using label elements to associate text labels with form controls',
    'H64': 'Using the title attribute of the frame and iframe elements',
    'H65': 'Using the title attribute to identify form controls when the label element cannot be used',
    'H88': 'Using HTML according to spec'
  };

  // Failures
  sc.failures = {
    'F59': 'Using script to make div or span a user interface control in HTML without providing a role for the control (This failure may be solved in the future using DHTML roadmap techniques.)',
    'F20': 'Not updating text alternatives when changes to non-text content occur',
    'F68': 'Association of label and user interface controls not being programmatically determined',
    'F79': 'Focus state of a user interface component not being programmatically determinable or no notification of change of focus state available',
    'F86': 'Not providing names for each part of a multi-part form field, such as a US telephone number',
    'F89': 'Using null alt on an image where the image is the only content in a link'
  };

  return sc;
}(quail));
