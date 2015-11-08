/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var LabelMustNotBeEmpty = function LabelMustNotBeEmpty(quail, test, Case) {
  var options = {
    selector: 'label',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = LabelMustNotBeEmpty;