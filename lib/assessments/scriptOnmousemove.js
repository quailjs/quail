/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmousemove = function ScriptOnmousemove(quail, test) {
  var options = {
    selector: '[onmousemove]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onmousemove'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmousemove;