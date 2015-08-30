/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.scriptOnclickRequiresOnKeypress = function (quail, test, Case) {
  var options = {
    selector: '[onclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onclick'
  };
  quail.components.event(quail, test, Case, options);
};
