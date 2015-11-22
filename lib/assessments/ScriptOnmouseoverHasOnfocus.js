/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var ScriptOnmouseoverHasOnfocus = function ScriptOnmouseoverHasOnfocus(test) {
  var options = {
    selector: '[onmouseover]',
    correspondingEvent: 'onfocus',
    searchEvent: 'onmouseover'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ScriptOnmouseoverHasOnfocus;