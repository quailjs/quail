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
      // If any of the tests failed or are untested, the SuccessCriteria failed.
      if (tests.findByStatus(['failed', 'untested']).length) {
        sc.set({
          'message': 'The Success Criteria failed',
          'status': 'failed'
        });
      }
      // If all of the tests are inapplicable, the Success Criteria is as well.
      else if (tests.findByStatus(['inapplicable']).length === requiredTests.length) {
        sc.set({
          'message': 'The Success Criteria does not apply',
          'status': 'inapplicable'
        });
      }
      else {
        sc.set({
          'message': 'The Success Criteria is satisfied',
          'status': 'passed'
        });
      }
    }
    else {
      sc.set({
        'message': 'Insufficient test coverage. The tests [' + requiredTests.join(', ') + '] are required but only the tests [' + criteriaTests.join(', ') + '] were run.',
        'status': 'cantTell'
      });
    }
  }

  // Create a new SuccessCriteria and pass it the evaluator.
  sc = quail.lib.SuccessCriteria(evaluator);
  sc.set('name', 'wcag:1.4.3');

  return sc;
}(quail));
