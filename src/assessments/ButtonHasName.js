/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var ButtonHasName = function (quail, test) {
  var options = {
    selector: 'button',
    content: 'true',
    empty: 'true',
    attribute: 'title'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = ButtonHasName;
