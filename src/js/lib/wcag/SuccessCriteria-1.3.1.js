/**
 * Success Criterion 1.3.1: Info and relationships
 *
 * @see http://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-programmatic
 */
quail.guidelines.wcag.successCriteria['1.3.1'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = quail.lib.SuccessCriteria({
    'name': 'wcag:1.3.1',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    // Situation A: The technology provides semantic structure to make information and relationships conveyed through presentation programmatically determinable
    'G115': 'Using semantic elements to mark up structure AND H49: Using semantic markup to mark emphasized or special text',
    // OR
    'G117': 'Using text to convey information that is conveyed by variations in presentation of text',
    // OR
    'G140': 'Separating information and structure from presentation to enable different presentations',
    // OR Making information and relationships conveyed through presentation programmatically determinable using the following techniques:
    'G138': 'Using semantic markup whenever color cues are used',
    'H48': 'Using ol, ul and dl for lists or groups of links',
    'H42': 'Using h1-h6 to identify headings',
    'SCR21': 'Using functions of the Document Object Model (DOM) to add content to a page (Scripting)',
    // Tables
    'H51': 'Using table markup to present tabular information',
    'H39': 'Using caption elements to associate data table captions with data tables',
    'H73': 'Using the summary attribute of the table element to give an overview of data tables',
    'H63': 'Using the scope attribute to associate header cells and data cells in data tables',
    'H43': 'Using id and headers attributes to associate data cells with header cells in data tables',
    // Forms
    'H44': 'Using label elements to associate text labels with form controls',
    'H65': 'Using the title attribute to identify form controls when the label element cannot be used',
    'H71': 'Providing a description for groups of form controls using fieldset and legend elements',
    'H85': 'Using OPTGROUP to group OPTION elements inside a SELECT',
    // OR
    'ARIA11': 'Using ARIA landmarks to identify regions of a page (ARIA)',
    // OR
    'ARIA12': 'Using role=heading to identify headings (ARIA)',
    // OR
    'ARIA13': 'Using aria-labelledby to name regions and landmarks (ARIA)',
    // OR
    'ARIA16': 'Using aria-labelledby to provide a name for user interface controls (ARIA)',
    'ARIA17': 'Using grouping roles to identify related form controls (ARIA)'
  };

  // Failures
  sc.failures = {
    // Web page structure
    'F2': 'Using changes in text presentation to convey information without using the appropriate markup or text',
    'F17': 'Insufficient information in DOM to determine one-to-one relationships (e.g., between labels with same id) in HTML',
    'F42': 'Using scripting events to emulate links in a way that is not programmatically determinable',
    'F43': 'Using structural markup in a way that does not represent relationships in the content',
    'F87': 'Inserting non-decorative content by using :before and :after pseudo-elements and the content property in CSS',
     // Tables
    'F46': 'Using th elements, caption elements, or non-empty summary attributes in layout tables',
    'F48': 'Using the pre element to markup tabular information',
    'F90': 'Incorrectly associating table headers and content via the headers and id attributes',
    'F91': 'Not correctly marking up table headers',
    'F33': 'Using white space characters to create multiple columns in plain text content',
    'F34': 'Using white space characters to format tables in plain text content',
     // Forms
    'F68': 'Association of label and user interface controls not being programmatically determinable'
  };

  return sc;
}(quail));
