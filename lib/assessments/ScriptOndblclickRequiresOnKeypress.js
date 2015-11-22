/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOndblclickRequiresOnKeypress = function ScriptOndblclickRequiresOnKeypress(test) {
  var options = {
    selector: '[ondblclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'ondblclick'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOndblclickRequiresOnKeypress;