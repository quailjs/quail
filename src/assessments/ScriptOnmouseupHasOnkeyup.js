/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseupHasOnkeyup = function (test) {
  var options = {
    selector: '[onmouseup]',
    correspondingEvent: 'onkeyup',
    searchEvent: 'onmouseup'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnmouseupHasOnkeyup;
