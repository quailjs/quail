/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.tableSummaryIsEmpty = function (quail, test, Case) {
  var options = {
    selector: 'table',
    attribute: 'summary',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
