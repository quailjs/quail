/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var InputTextHasValue = function (test, options) {
  options = options || {
    selector: 'input[type="text"]',
    attribute: 'value',
    empty: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = InputTextHasValue;
