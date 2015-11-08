/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var EventComponent = require('EventComponent');

var LinkDoesNotChangeContextOnFocus = function LinkDoesNotChangeContextOnFocus(quail, test, Case) {
  var options = {
    selector: 'a[href]',
    searchEvent: 'onfocus'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = LinkDoesNotChangeContextOnFocus;