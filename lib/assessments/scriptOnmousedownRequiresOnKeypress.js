/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var EventComponent = require('EventComponent');

var ScriptOnmousedownRequiresOnKeypress = function ScriptOnmousedownRequiresOnKeypress(quail, test, Case) {
  var options = {
    selector: '[onmousedown]',
    correspondingEvent: 'onkeydown',
    searchEvent: 'onmousedown'
  };
  EventComponent(quail, test, Case, options);
};;
module.exports = ScriptOnmousedownRequiresOnKeypress;