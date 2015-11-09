/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleNotEmpty = function (quail, test) {
  var options = {
    selector: 'head > title',
    content: 'true',
    empty: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = DocumentTitleNotEmpty;
