/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.inputTextHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input'
  };
  quail.components.label(quail, test, Case, options);
};
