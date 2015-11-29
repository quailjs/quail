/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var SelectDoesNotChangeContext = function (test, options) {
  options = options || {
    selector: 'select',
    searchEvent: 'onchange'
  };
  EventComponent(test, options);
};
module.exports = SelectDoesNotChangeContext;
