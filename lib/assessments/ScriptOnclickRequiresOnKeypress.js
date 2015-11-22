/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnclickRequiresOnKeypress = function ScriptOnclickRequiresOnKeypress(test) {
  var options = {
    selector: '[onclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onclick'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnclickRequiresOnKeypress;