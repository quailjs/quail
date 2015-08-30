/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.checkboxHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="checkbox"]'
  };
  quail.components.label(quail, test, Case, options);
};
