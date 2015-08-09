/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.buttonDoesNotChangeContextOnFocus = function (quail, test, Case) {
  var options = {
    searchEvent: 'onfocus'
  };
  quail.components.event(quail, test, Case, options);
};
