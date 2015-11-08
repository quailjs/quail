/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var PasswordHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="password"]'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = PasswordHasLabel;
