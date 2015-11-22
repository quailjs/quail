/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmousedownRequiresOnKeypress = function ScriptOnmousedownRequiresOnKeypress(test) {
  var options = {
    selector: '[onmousedown]',
    correspondingEvent: 'onkeydown',
    searchEvent: 'onmousedown'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmousedownRequiresOnKeypress;