/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.inputTextHasValue = function (quail, test, Case) {
  var options = {
    selector: 'input[type="text"]',
    attribute: 'value',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
