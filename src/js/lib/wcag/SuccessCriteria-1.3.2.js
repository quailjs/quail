/**
 * Success Criterion 1.3.2: Meaningful sequence
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-sequence.html
 */
quail.guidelines.wcag.successCriteria['1.3.2'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.3.2',
    preEvaluator: preEvaluator
  });

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

  return sc;
}(quail));
