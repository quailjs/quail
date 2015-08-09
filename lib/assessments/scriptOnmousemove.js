/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.scriptOnmousemove = function (quail, test, Case) {
  var options = {
    selector: '[onmousemove]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onmousemove'
  };
  quail.components.event(quail, test, Case, options);
};
