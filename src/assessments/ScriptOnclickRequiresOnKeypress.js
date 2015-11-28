/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnclickRequiresOnKeypress = function (test) {
  var options = {
    selector: '[onclick]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onclick'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnclickRequiresOnKeypress;
