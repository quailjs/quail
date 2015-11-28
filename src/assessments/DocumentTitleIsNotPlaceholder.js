/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleIsNotPlaceholder = function (test) {
  var options = {
    selector: 'head > title',
    content: 'true'
  };
  PlaceholderComponent(test, options);
};
module.exports = DocumentTitleIsNotPlaceholder;
