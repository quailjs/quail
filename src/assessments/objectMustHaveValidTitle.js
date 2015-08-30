/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.objectMustHaveValidTitle = function (quail, test, Case) {
  var options = {
    selector: 'object',
    attribute: 'title',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
