/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.scriptOnmouseupHasOnkeyup = function (quail, test, Case) {
  var options = {
    selector: '[onmouseup]',
    correspondingEvent: 'onkeyup',
    searchEvent: 'onmouseup'
  };
  quail.components.event(quail, test, Case, options);
};