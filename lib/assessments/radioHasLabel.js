/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.radioHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="radio"]'
  };
  quail.components.label(quail, test, Case, options);
};
