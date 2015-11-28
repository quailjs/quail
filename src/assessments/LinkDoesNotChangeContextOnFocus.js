/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var LinkDoesNotChangeContextOnFocus = function (test, options) {
  options = options || {
    selector: 'a[href]',
    searchEvent: 'onfocus'
  };
  EventComponent(test, options);
};
module.exports = LinkDoesNotChangeContextOnFocus;
