/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustHaveValidTitle = function (test, options) {
  options = options || {
    selector: 'object',
    attribute: 'title',
    empty: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = ObjectMustHaveValidTitle;
