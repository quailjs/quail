/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var LabelComponent = require('LabelComponent');

var TextareaHasAssociatedLabel = function TextareaHasAssociatedLabel(quail, test, Case) {
  var options = {
    selector: 'textarea'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = TextareaHasAssociatedLabel;