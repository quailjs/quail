/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var LabelComponent = require('LabelComponent');

var RadioHasLabel = function (test) {
  var options = {
    selector: 'input[type="radio"]'
  };
  LabelComponent(test, options);
};
module.exports = RadioHasLabel;
