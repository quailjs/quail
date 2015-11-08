/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var TableSummaryIsEmpty = function TableSummaryIsEmpty(quail, test, Case) {
  var options = {
    selector: 'table',
    attribute: 'summary',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = TableSummaryIsEmpty;