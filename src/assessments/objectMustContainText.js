/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.objectMustContainText = function (quail, test, Case) {
  var options = {
    selector: 'object',
    content: 'true',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
