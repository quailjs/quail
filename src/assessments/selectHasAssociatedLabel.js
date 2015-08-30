/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.selectHasAssociatedLabel = function (quail, test, Case) {
  var options = {
    selector: 'select'
  };
  quail.components.label(quail, test, Case, options);
};
