/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.documentTitleNotEmpty = function (quail, test, Case) {
  var options = {
    selector: 'head > title',
    content: 'true',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
