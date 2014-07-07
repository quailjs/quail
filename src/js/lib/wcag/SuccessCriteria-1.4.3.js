/**
 * Success Criterion 1.4.3: Contrast
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
 */
quail.guidelines.wcag.successCriteria['1.4.3'] = (function (quail) {
  var sc;

  // The tests that must be run in order to evaluate this Success Criteria.
  var requiredTests = ['cssTextHasContrast'];
  // The set of tests that were run that pertain to this Success Criteria. This
  // will be the union of the tests that were run and the required tests.
  var criteriaTests = [];

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator(tests) {
    tests = tests;
    return true;
  }

  /**
   * Evaluates the Success Criteria.
   */
  function evaluator(tests) {
    criteriaTests = sc.filterTests(tests, requiredTests);
    // If the length of the union equals the length of the required tests,
    // then we have the necessary tests to evaluate this success criteria.
    if (criteriaTests.length === requiredTests.length) {
      // Find the tests to evaluate.
      var cssTextHasContrast = tests.find('cssTextHasContrast');
      // Cycle through the cases in the Success Criteria.
      sc.each(function (index, _case) {
        var selector = _case.get('selector');
        var conclusion = 'untested';
        var testCase, caseGroups;

        // Process 'labelsAreAssignedToAnInput'.
        caseGroups = cssTextHasContrast.groupCasesBySelector(selector);
        testCase = caseGroups && caseGroups[selector] && caseGroups[selector][0];

        if (testCase) {
          conclusion = testCase.get('status') || 'cantTell';
        }

        // Add the case to the Success Criteria.
        sc.addConclusion(conclusion, _case);
      });
    }
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  return sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.4.3',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });
}(quail));
