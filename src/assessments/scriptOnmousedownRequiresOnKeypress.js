/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmousedownRequiresOnKeypress = function (quail, test, Case) {
  var options = {
    selector: '[onmousedown]',
    correspondingEvent: 'onkeydown',
    searchEvent: 'onmousedown'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmousedownRequiresOnKeypress;
