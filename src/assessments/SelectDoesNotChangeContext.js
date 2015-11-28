/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var EventComponent = require('EventComponent');

var SelectDoesNotChangeContext = function (test) {
  var options = {
    selector: 'select',
    searchEvent: 'onchange'
  };
  EventComponent(test, options);
};
module.exports = SelectDoesNotChangeContext;
