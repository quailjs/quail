/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseoutHasOnmouseblur = function (test) {
  var options = {
    selector: '[onmouseout]',
    correspondingEvent: 'onblur',
    searchEvent: 'onmouseout'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmouseoutHasOnmouseblur;
