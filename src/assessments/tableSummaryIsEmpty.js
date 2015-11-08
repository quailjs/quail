/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var TableSummaryIsEmpty = function (quail, test, Case) {
  var options = {
    selector: 'table',
    attribute: 'summary',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};;
module.exports = TableSummaryIsEmpty;
