/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var LegendTextNotPlaceholder = function (test) {
  var options = {
    selector: 'legend',
    content: 'true',
    emtpy: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = LegendTextNotPlaceholder;
