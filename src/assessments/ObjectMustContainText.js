/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustContainText = function (test, options) {
  options = options || {
    selector: 'object',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = ObjectMustContainText;
