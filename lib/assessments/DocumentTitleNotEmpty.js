/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleNotEmpty = function DocumentTitleNotEmpty(quail, test) {
  var options = {
    selector: 'head > title',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = DocumentTitleNotEmpty;