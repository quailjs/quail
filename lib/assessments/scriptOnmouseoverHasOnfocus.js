/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.scriptOnmouseoverHasOnfocus = function (quail, test, Case) {
  var options = {
    selector: '[onmouseover]',
    correspondingEvent: 'onfocus',
    searchEvent: 'onmouseover'
  };
  quail.components.event(quail, test, Case, options);
};
