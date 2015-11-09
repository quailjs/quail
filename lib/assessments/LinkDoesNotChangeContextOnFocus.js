/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var EventComponent = require('EventComponent');

var LinkDoesNotChangeContextOnFocus = function LinkDoesNotChangeContextOnFocus(quail, test) {
  var options = {
    selector: 'a[href]',
    searchEvent: 'onfocus'
  };
  EventComponent(quail, test, Case, options);
};
module.exports = LinkDoesNotChangeContextOnFocus;