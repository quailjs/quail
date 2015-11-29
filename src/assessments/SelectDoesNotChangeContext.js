/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var SelectDoesNotChangeContext = {
  run: function (test, options) {
    options = options || {
      selector: 'select',
      searchEvent: 'onchange'
    };
    EventComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = SelectDoesNotChangeContext;
