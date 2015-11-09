/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var LabelComponent = require('LabelComponent');

var RadioHasLabel = function RadioHasLabel(quail, test) {
  var options = {
    selector: 'input[type="radio"]'
  };
  LabelComponent(quail, test, Case, options);
};
module.exports = RadioHasLabel;