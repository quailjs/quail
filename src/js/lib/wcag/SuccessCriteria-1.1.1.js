/**
 * Success Criterion 1.1.1: Non-text content
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html
 */
quail.guidelines.wcag.successCriteria['1.1.1'] = (function (quail) {
  var sc;

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {
    'F3': 'Using CSS to include images that convey important information',
    'F13': 'Having a text alternative that does not include information that is conveyed by color differences in the image',
    'F20': 'Not updating text alternatives when changes to non-text content occur',
    'F30': 'Using text alternatives that are not alternatives (e.g., filenames or placeholder text)',
    'F38': 'Not marking up decorative images in HTML in a way that allows assistive technology to ignore them',
    'F39': 'Providing a text alternative that is not null (e.g., alt="spacer" or alt="image") for images that should be ignored by assistive technology',
    'F65': 'Omitting the alt attribute or text alternative on img elements, area elements, and input elements of type "image"',
    'F67': 'Providing long descriptions for non-text content that does not serve the same purpose or does not present the same information',
    'F71': 'Using text look-alikes to represent text without providing a text alternative',
    'F72': 'Using ASCII art without providing a text alternative'
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
    'name': 'wcag:1.1.1',
    'requiredTests': requiredTests,
    preEvaluator: preEvaluator,
    evaluator: evaluator
  });

  return sc;
}(quail));
