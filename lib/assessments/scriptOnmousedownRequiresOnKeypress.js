/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.scriptOnmousedownRequiresOnKeypress = function (quail, test, Case) {
  var options = {
    selector: '[onmousedown]',
    correspondingEvent: 'onkeydown',
    searchEvent: 'onmousedown'
  };
  quail.components.event(quail, test, Case, options);
};