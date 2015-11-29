/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var TextareaHasAssociatedLabel = function (test, options) {
  options = options || {
    selector: 'textarea'
  };
  LabelComponent(test, options);
};
module.exports = TextareaHasAssociatedLabel;
