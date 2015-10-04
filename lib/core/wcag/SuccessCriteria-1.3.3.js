/**
 * Success Criterion 1.3.3: Sensory characteristics
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-understanding.html
 */
'use strict';

var quail = require('quail');

var SuccessCriteria = require('SuccessCriteria');

var quail = require('quail');
quail.guidelines.wcag.successCriteria['1.3.3'] = (function (quail) {

  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:1.3.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {
    G96: 'Providing textual identification of items that otherwise rely only on sensory information to be understood'
  };

  // Failures
  sc.failures = {
    F14: 'Identifying content only by its shape or location',
    F26: 'Using a graphical symbol alone to convey information'
  };

  return sc;
})(quail);