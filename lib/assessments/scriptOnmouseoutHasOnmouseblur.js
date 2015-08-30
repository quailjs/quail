/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

quail.scriptOnmouseoutHasOnmouseblur = function (quail, test, Case) {
  var options = {
    selector: '[onmouseout]',
    correspondingEvent: 'onblur',
    searchEvent: 'onmouseout'
  };
  quail.components.event(quail, test, Case, options);
};