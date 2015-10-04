/**
 * Success Criterion 2.4.3: Focus Order
 *
 * @see http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html
 */
'use strict';

var quail = require('quail');

var SuccessCriteria = require('SuccessCriteria');

var quail = require('quail');
quail.guidelines.wcag.successCriteria['2.4.3'] = (function (quail) {
  /**
   * Determines if this Success Criteria applies to the document.
   */
  function preEvaluator() {
    return true;
  }

  // Create a new SuccessCriteria and pass it the evaluation callbacks.
  var sc = SuccessCriteria({
    name: 'wcag:2.4.3',
    preEvaluator: preEvaluator
  });

  // Techniques
  sc.techniques = {};

  // Failures
  sc.failures = {};

  return sc;
})(quail);