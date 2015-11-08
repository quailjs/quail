/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var LabelComponent = require('LabelComponent');

var SelectHasAssociatedLabel = function SelectHasAssociatedLabel(quail, test, Case) {
  var options = {
    selector: 'select'
  };
  LabelComponent(quail, test, Case, options);
};
module.exports = SelectHasAssociatedLabel;