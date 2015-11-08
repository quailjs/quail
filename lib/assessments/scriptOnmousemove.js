/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var EventComponent = require('EventComponent');

var ScriptOnmousemove = function ScriptOnmousemove(quail, test, Case) {
  var options = {
    selector: '[onmousemove]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onmousemove'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmousemove;