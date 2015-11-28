/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var LabelMustNotBeEmpty = function (test) {
  var options = {
    selector: 'label',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = LabelMustNotBeEmpty;
