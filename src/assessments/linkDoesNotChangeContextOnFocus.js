/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.linkDoesNotChangeContextOnFocus = function (quail, test, Case) {
  var options = {
    selector: 'a[href]',
    searchEvent: 'onfocus'
  };
  quail.components.event(quail, test, Case, options);
};
