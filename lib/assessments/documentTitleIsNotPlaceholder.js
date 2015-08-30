/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.documentTitleIsNotPlaceholder = function (quail, test, Case) {
  var options = {
    selector: 'head > title',
    content: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};