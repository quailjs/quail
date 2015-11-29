/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOndblclickRequiresOnKeypress = function (test, options) {
  options = options || {
    selector: '[ondblclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'ondblclick'
  };
  EventComponent(test, options);
};
module.exports = ScriptOndblclickRequiresOnKeypress;
