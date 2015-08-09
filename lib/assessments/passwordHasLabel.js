/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.passwordHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="password"]'
  };
  quail.components.label(quail, test, Case, options);
};
