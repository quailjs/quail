/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustHaveValidTitle = function ObjectMustHaveValidTitle(quail, test, Case) {
  var options = {
    selector: 'object',
    attribute: 'title',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = ObjectMustHaveValidTitle;