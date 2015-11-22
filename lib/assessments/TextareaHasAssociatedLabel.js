/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');
var quail = require('quail');

var LabelComponent = require('LabelComponent');

var TextareaHasAssociatedLabel = function TextareaHasAssociatedLabel(test) {
  var options = {
    selector: 'textarea'
  };
  LabelComponent(quail, test, Case, options);
};
module.exports = TextareaHasAssociatedLabel;