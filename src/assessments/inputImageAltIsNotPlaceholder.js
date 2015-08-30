/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.inputImageAltIsNotPlaceholder = function (quail, test, Case) {
  var options = {
    selector: 'input[type="image"]',
    attribute: 'alt'
  };
  quail.components.placeholder(quail, test, Case, options);
};
