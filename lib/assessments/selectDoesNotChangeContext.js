/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.selectDoesNotChangeContext = function (quail, test, Case) {
  var options = {
    selector: 'select',
    searchEvent: 'onchange'
  };
  quail.components.event(quail, test, Case, options);
};