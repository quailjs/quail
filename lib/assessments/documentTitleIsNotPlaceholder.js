/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleIsNotPlaceholder = function DocumentTitleIsNotPlaceholder(quail, test, Case) {
  var options = {
    selector: 'head > title',
    content: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = DocumentTitleIsNotPlaceholder;