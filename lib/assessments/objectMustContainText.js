/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustContainText = function ObjectMustContainText(quail, test, Case) {
  var options = {
    selector: 'object',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};;
module.exports = ObjectMustContainText;