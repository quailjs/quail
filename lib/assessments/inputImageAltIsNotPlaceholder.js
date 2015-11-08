/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var InputImageAltIsNotPlaceholder = function InputImageAltIsNotPlaceholder(quail, test, Case) {
  var options = {
    selector: 'input[type="image"]',
    attribute: 'alt'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = InputImageAltIsNotPlaceholder;