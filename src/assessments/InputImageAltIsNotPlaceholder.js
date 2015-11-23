/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var InputImageAltIsNotPlaceholder = function (test) {
  var options = {
    selector: 'input[type="image"]',
    attribute: 'alt'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = InputImageAltIsNotPlaceholder;
