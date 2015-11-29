/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ButtonDoesNotChangeContextOnFocus = {
  run: function (test, options) {
    options = options || {
      searchEvent: 'onfocus'
    };
    EventComponent(test, options);
  },

  meta: {
replace: 'this'
  }
};
module.exports = ButtonDoesNotChangeContextOnFocus;
