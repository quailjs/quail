/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var InputTextValueNotEmpty = function InputTextValueNotEmpty(quail, test, Case) {
  var options = {
    selector: 'input[type="text"]',
    attribute: 'value',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = InputTextValueNotEmpty;