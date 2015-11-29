/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var SelectHasAssociatedLabel = function (test, options) {
  options = options || {
    selector: 'select'
  };
  LabelComponent(test, options);
};
module.exports = SelectHasAssociatedLabel;
