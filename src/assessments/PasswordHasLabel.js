/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var LabelComponent = require('LabelComponent');

var PasswordHasLabel = function (test) {
  var options = {
    selector: 'input[type="password"]'
  };
  LabelComponent(test, options);
};
module.exports = PasswordHasLabel;
