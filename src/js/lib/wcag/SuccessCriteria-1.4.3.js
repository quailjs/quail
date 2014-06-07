quail.guidelines.wcag.successCriteria['1.4.3'] = (function (quail) {
  var sc;

  // The tests that must be run in order to evaluate this Success Criteria.
  var requiredTests = ['cssTextHasContrast'];
  // The set of tests that were run that pertain to this Success Criteria. This
  // will be the union of the tests that were run and the required tests.
  var criteriaTests = [];

  /**
   * Evaluates the Success Criteria.
   */
  function evaluator(tests) {
    criteriaTests = sc.filterTests(tests, requiredTests);
    // If the length of the union equals the length of the required tests,
    // then we have the necessary tests to evaluate this success criteria.
    if (criteriaTests.length === requiredTests.length) {

    }

    // Report the results.
    sc.report();
  }

  // Create a new SuccessCriteria and pass it the evaluator.
  sc = quail.lib.SuccessCriteria(evaluator);
  sc.set('name', 'wcag:1.4.3');

  return sc;
}(quail));
