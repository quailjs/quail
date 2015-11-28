/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var LabelComponent = require('LabelComponent');

var SelectHasAssociatedLabel = function (test) {
  var options = {
    selector: 'select'
  };
  LabelComponent(test, options);
};
module.exports = SelectHasAssociatedLabel;
