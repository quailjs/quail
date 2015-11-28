/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var InputTextValueNotEmpty = function (test) {
  var options = {
    selector: 'input[type="text"]',
    attribute: 'value',
    empty: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = InputTextValueNotEmpty;
