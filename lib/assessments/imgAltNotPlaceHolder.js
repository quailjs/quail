/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.imgAltNotPlaceHolder = function (quail, test, Case) {
  var options = {
    selector: 'img',
    attribute: 'alt'
  };
  quail.components.placeholder(quail, test, Case, options);
};
