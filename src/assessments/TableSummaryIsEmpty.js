/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var TableSummaryIsEmpty = function (test) {
  var options = {
    selector: 'table',
    attribute: 'summary',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = TableSummaryIsEmpty;
