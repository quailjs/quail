/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var InputTextHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = InputTextHasLabel;
