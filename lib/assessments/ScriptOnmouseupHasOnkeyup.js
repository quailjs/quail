/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseupHasOnkeyup = function ScriptOnmouseupHasOnkeyup(quail, test) {
  var options = {
    selector: '[onmouseup]',
    correspondingEvent: 'onkeyup',
    searchEvent: 'onmouseup'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmouseupHasOnkeyup;