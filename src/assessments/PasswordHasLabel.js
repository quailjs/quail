/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var PasswordHasLabel = function (test, options) {
  options = options || {
    selector: 'input[type="password"]'
  };
  LabelComponent(test, options);
};
module.exports = PasswordHasLabel;
