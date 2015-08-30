/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.inputTextValueNotEmpty = function (quail, test, Case) {
  var options = {
    selector: 'input[type="text"]',
    attribute: 'value',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};