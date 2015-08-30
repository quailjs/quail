/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.buttonHasName = function (quail, test, Case) {
  var options = {
    selector: 'button',
    content: 'true',
    empty: 'true',
    attribute: 'title'
  };
  quail.components.placeholder(quail, test, Case, options);
};