/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.labelMustNotBeEmpty = function (quail, test, Case) {
  var options = {
    selector: 'label',
    content: 'true',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};