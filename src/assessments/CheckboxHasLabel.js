/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var CheckboxHasLabel = function (test, options) {
  options = options || {
    selector: 'input[type="checkbox"]'
  };
  LabelComponent(test, options);
};
module.exports = CheckboxHasLabel;
