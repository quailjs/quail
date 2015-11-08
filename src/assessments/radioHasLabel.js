/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var RadioHasLabel = function (quail, test, Case) {
  var options = {
    selector: 'input[type="radio"]'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = RadioHasLabel;
