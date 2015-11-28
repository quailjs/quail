/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmousedownRequiresOnKeypress = function (test, options) {
  options = options || {
    selector: '[onmousedown]',
    correspondingEvent: 'onkeydown',
    searchEvent: 'onmousedown'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnmousedownRequiresOnKeypress;
