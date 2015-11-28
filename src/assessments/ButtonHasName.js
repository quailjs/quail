/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var ButtonHasName = function (test) {
  var options = {
    selector: 'button',
    content: 'true',
    empty: 'true',
    attribute: 'title'
  };
  PlaceholderComponent(test, options);
};
module.exports = ButtonHasName;
