/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var HeadersHaveText = function HeadersHaveText(quail, test, Case) {
  var options = {
    selector: 'h1, h2, h3, h4, h5, h6',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};;
module.exports = HeadersHaveText;