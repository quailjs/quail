/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmouseupHasOnkeyup = function (quail, test, Case) {
  var options = {
    selector: '[onmouseup]',
    correspondingEvent: 'onkeyup',
    searchEvent: 'onmouseup'
  };
  EventComponent(quail, test, Case, options);
};;
module.exports = ScriptOnmouseupHasOnkeyup;
