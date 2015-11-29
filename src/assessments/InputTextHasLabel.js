/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var InputTextHasLabel = function (test, options) {
  options = options || {
    selector: 'input'
  };
  LabelComponent(test, options);
};
module.exports = InputTextHasLabel;
