/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var LabelComponent = require('LabelComponent');

var InputTextHasLabel = function (quail, test) {
  var options = {
    selector: 'input'
  };
  LabelComponent(quail, test, Case, options);
};
module.exports = InputTextHasLabel;
