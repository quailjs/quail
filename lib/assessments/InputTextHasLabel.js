/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var LabelComponent = require('LabelComponent');

var InputTextHasLabel = function InputTextHasLabel(test) {
  var options = {
    selector: 'input'
  };
  LabelComponent(quail, test, Case, options);
};
module.exports = InputTextHasLabel;