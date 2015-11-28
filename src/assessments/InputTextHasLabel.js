/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var LabelComponent = require('LabelComponent');

var InputTextHasLabel = function (test) {
  var options = {
    selector: 'input'
  };
  LabelComponent(test, options);
};
module.exports = InputTextHasLabel;
