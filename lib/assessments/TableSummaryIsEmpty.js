/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var TableSummaryIsEmpty = function TableSummaryIsEmpty(quail, test) {
  var options = {
    selector: 'table',
    attribute: 'summary',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = TableSummaryIsEmpty;