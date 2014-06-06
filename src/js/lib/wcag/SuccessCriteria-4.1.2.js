/**
 * Test for WCAG success criterion 4.1.2: Name, Role, Value.
 */
quail.guidelines.wcag.successCriteria['4.1.2'] = (function (quail) {
  var sc;

  // The tests that must be run in order to evaluate this Success Criteria.
  // @todo, identify the complete set of required tests for this Success Criteria.
  var requiredTests = ['labelsAreAssignedToAnInput', 'labelMustBeUnique', 'inputWithoutLabelHasTitle'];
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
      // (1) Get a list of cases keyed by selector from each test with the
      //   Test.getCasesBySelector() method.
      // (2) Determine if any of the following failures apply to the element
      //   at the selector. If so, fail the Success Criteria for that selector.
      //
      //   F59: Using script to make div or span a user interface control in HTML without providing a role for the control (This failure may be solved in the future using DHTML roadmap techniques.)
      //   F20: Not updating text alternatives when changes to non-text content occur
      //   F68: Association of label and user interface controls not being programmatically determined
      //   F79: Focus state of a user interface component not being programmatically determinable or no notification of change of focus state available
      //   F86: Not providing names for each part of a multi-part form field, such as a US telephone number
      //   F89: Using null alt on an image where the image is the only content in a link ( #59 :ok: )
      // (3) If no Failures are detected, so if the Techniques are satisfied. If
      //   one of the techniques is satisfed for the element at the selector,
      //   Success Criteria is satisfied.
      //
      //   ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used
      //   ARIA16: Using aria-labelledby to provide a name for user interface controls
      //
      //   G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes using technology-specific techniques below:
      //   AND
      //
      //   H91: Using HTML form controls and links ( #66 )
      //   H44: Using label elements to associate text labels with form controls
      //   H64: Using the title attribute of the frame and iframe elements ( #65 )
      //   H65: Using the title attribute to identify form controls when the label element cannot be used ( #64 )
      //   H88: Using HTML according to spec ( #86 )
      //
      // (4) Currently the Success Criteria object has a single state value i.e.
      //   passed or failed. I think we need to mark this status on each case
      //   in the keyed-by-selector list of Cases. We need to think about this
      //   more.
    }
  }

  // Create a new SuccessCriteria and pass it the evaluator.
  sc = quail.lib.SuccessCriteria(evaluator);
  sc.set('name', 'wcag:4.1.2');

  return sc;
}(quail));
