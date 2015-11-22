/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var LegendTextNotPlaceholder = function LegendTextNotPlaceholder(test) {
  var options = {
    selector: 'legend',
    content: 'true',
    emtpy: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = LegendTextNotPlaceholder;