/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.scriptOndblclickRequiresOnKeypress = function (quail, test, Case) {
  var options = {
    selector: '[ondblclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'ondblclick'
  };
  quail.components.event(quail, test, Case, options);
};