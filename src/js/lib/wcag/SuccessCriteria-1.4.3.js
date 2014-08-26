/**
 * Success Criterion 1.4.3: Contrast
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
 */
quail.guidelines.wcag.successCriteria['1.4.3'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  /**
   * (unused right now)
   *
   * Evaluates the Success Criteria.
   */
  //function evaluator(tests) {
    // // The set of tests that were run that pertain to this Success Criteria. This
    // // will be the union of the tests that were run and the required tests.
    // var criteriaTests = sc.filterTests(tests, sc.requiredTests);
    // // If the length of the union equals the length of the required tests,
    // // then we have the necessary tests to evaluate this success criteria.
    // if (criteriaTests.length === requiredTests.length) {
    //   // Find the tests to evaluate.
    //   var cssTextHasContrast = tests.find('cssTextHasContrast');
    //   // Cycle through the cases in the Success Criteria.
    //   sc.each(function (index, _case) {
    //     var selector = _case.get('selector');
    //     var conclusion = 'untested';
    //     var testCase, caseGroups;

    //     // Process 'labelsAreAssignedToAnInput'.
    //     caseGroups = cssTextHasContrast.groupCasesBySelector(selector);
    //     testCase = caseGroups && caseGroups[selector] && caseGroups[selector][0];

    //     if (testCase) {
    //       conclusion = testCase.get('status') || 'cantTell';
    //     }

    //     // Add the case to the Success Criteria.
    //     sc.addConclusion(conclusion, _case);
    //   });
    // }
  //}

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.4.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    'G148': 'Not specifying background color, not specifying text color, and not using technology features that change those defaults',
    'G174': 'Providing a control with a sufficient contrast ratio that allows users to switch to a presentation that uses sufficient contrast',
    'G18': 'Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text for situation A AND G145: Ensuring that a contrast ratio of at least 3:1 exists between text (and images of text) and background behind the text for situation B'
  };

  // Failures
  sc.failures = {
    'F24': 'Specifying foreground colors without specifying background colors or vice versa',
    'F83': 'Using background images that do not provide sufficient contrast with foreground text (or images of text)'
  };

  return sc;
}(quail));
