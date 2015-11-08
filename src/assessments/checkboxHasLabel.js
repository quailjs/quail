/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var CheckboxHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="checkbox"]'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = CheckboxHasLabel;
