/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ButtonDoesNotChangeContextOnFocus = function (quail, test, Case) {
  var options = {
    searchEvent: 'onfocus'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = ButtonDoesNotChangeContextOnFocus;
