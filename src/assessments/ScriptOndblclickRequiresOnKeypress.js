/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOndblclickRequiresOnKeypress = function (test) {
  var options = {
    selector: '[ondblclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'ondblclick'
  };
  EventComponent(test, options);
};
module.exports = ScriptOndblclickRequiresOnKeypress;
