/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var LabelComponent = require('LabelComponent');

var CheckboxHasLabel = function CheckboxHasLabel(quail, test, Case) {
  var options = {
    selector: 'input[type="checkbox"]'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = CheckboxHasLabel;