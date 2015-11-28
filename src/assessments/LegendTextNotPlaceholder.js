/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var LegendTextNotPlaceholder = function (test, options) {
  options = options || {
    selector: 'legend',
    content: 'true',
    emtpy: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = LegendTextNotPlaceholder;
