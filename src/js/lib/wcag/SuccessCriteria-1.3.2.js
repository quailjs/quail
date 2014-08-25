/**
 * Success Criterion 1.3.2: Meaningful sequence
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-sequence.html
 */
quail.guidelines.wcag.successCriteria['1.3.2'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {
    'G57': 'Ordering the content in a meaningful sequence (scope: for all the content in the Web page)',
    // OR
    'H34': 'Using a Unicode right-to-left mark (RLM) or left-to-right mark (LRM) to mix text direction inline (languageUnicodeDirection)',
    'H56': 'Using the dir attribute on an inline element to resolve problems with nested directional runs',
    'C6': 'Positioning content based on structural markup (CSS)',
    'C8': 'Using CSS letter-spacing to control spacing within a word',
    // OR
    'C27': 'Making the DOM order match the visual order (CSS)'
  };

  // Failures
  sc.failures = {
    // HTML Failures
    'F49': 'Using an HTML layout table that does not make sense when linearized',
    'F32': 'Using white space characters to control spacing within a word (whiteSpaceInWord)',
    'F1': 'Changing the meaning of content by positioning information with CSS',
    // Plain text Failures
    'F34': 'Using white space characters to format tables in plain text content (tabularDataIsInTable)',
    'F33': 'Using white space characters to create multiple columns in plain text content (tabularDataIsInTable)'
  };

  // The tests that must be run in order to evaluate this Success Criteria.
  var requiredTests = [];
  // The set of tests that were run that pertain to this Success Criteria. This
  // will be the union of the tests that were run and the required tests.
  var criteriaTests = [];

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
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

    }
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.3.2',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
