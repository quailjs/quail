/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.legendTextNotPlaceholder = function (quail, test, Case) {
  var options = {
    selector: 'legend',
    content: 'true',
    emtpy: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
