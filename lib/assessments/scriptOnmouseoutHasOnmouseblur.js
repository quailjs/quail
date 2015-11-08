/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var EventComponent = require('EventComponent');

var ScriptOnmouseoutHasOnmouseblur = function ScriptOnmouseoutHasOnmouseblur(quail, test, Case) {
  var options = {
    selector: '[onmouseout]',
    correspondingEvent: 'onblur',
    searchEvent: 'onmouseout'
  };
  EventComponent(quail, test, Case, options);
};;
module.exports = ScriptOnmouseoutHasOnmouseblur;