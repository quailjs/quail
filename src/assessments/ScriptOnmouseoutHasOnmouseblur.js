/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmouseoutHasOnmouseblur = function (test, options) {
  options = options || {
    selector: '[onmouseout]',
    correspondingEvent: 'onblur',
    searchEvent: 'onmouseout'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnmouseoutHasOnmouseblur;
