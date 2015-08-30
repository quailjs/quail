/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.headersHaveText = function (quail, test, Case) {
  var options = {
    selector: 'h1, h2, h3, h4, h5, h6',
    content: 'true',
    empty: 'true'
  };
  quail.components.placeholder(quail, test, Case, options);
};
