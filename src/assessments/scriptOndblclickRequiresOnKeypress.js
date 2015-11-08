/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOndblclickRequiresOnKeypress = function (quail, test, Case) {
  var options = {
    selector: '[ondblclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'ondblclick'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOndblclickRequiresOnKeypress;
