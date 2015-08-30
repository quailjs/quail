/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.textareaHasAssociatedLabel = function (quail, test, Case) {
  var options = {
    selector: 'textarea'
  };
  quail.components.label(quail, test, Case, options);
};