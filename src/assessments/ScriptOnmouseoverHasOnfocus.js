/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseoverHasOnfocus = function (test) {
  var options = {
    selector: '[onmouseover]',
    correspondingEvent: 'onfocus',
    searchEvent: 'onmouseover'
  };
  EventComponent(test, options);
};
module.exports = ScriptOnmouseoverHasOnfocus;
