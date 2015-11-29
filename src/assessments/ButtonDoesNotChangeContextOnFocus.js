/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ButtonDoesNotChangeContextOnFocus = function (test, options) {
  options = options || {
    searchEvent: 'onfocus'
  };
  EventComponent(test, options);
};
module.exports = ButtonDoesNotChangeContextOnFocus;
