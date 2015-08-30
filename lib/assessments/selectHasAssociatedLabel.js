/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.selectHasAssociatedLabel = function (quail, test, Case) {
  var options = {
    selector: 'select'
  };
  quail.components.label(quail, test, Case, options);
};