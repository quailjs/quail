/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmousemove = function (test) {
  var options = {
    selector: '[onmousemove]',
    correspondingEvent: 'onkeypress',
    searchEvent: 'onmousemove'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnmousemove;
