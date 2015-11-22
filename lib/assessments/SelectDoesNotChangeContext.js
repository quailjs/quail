/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var SelectDoesNotChangeContext = function SelectDoesNotChangeContext(test) {
  var options = {
    selector: 'select',
    searchEvent: 'onchange'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = SelectDoesNotChangeContext;