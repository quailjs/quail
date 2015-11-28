/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');
var quail = require('quail');

var LabelComponent = require('LabelComponent');

var TextareaHasAssociatedLabel = function (test) {
  var options = {
    selector: 'textarea'
  };
  LabelComponent(test, options);
};
module.exports = TextareaHasAssociatedLabel;
