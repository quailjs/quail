/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.inputTextHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input'
  };
  quail.components.label(quail, test, Case, options);
};