/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var LegendTextNotPlaceholder = function LegendTextNotPlaceholder(quail, test, Case) {
  var options = {
    selector: 'legend',
    content: 'true',
    emtpy: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};;
module.exports = LegendTextNotPlaceholder;