/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseupHasOnkeyup = function (quail, test) {
  var options = {
    selector: '[onmouseup]',
    correspondingEvent: 'onkeyup',
    searchEvent: 'onmouseup'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmouseupHasOnkeyup;
