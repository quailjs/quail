/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleIsNotPlaceholder = function (quail, test, Case) {
  var options = {
    selector: 'head > title',
    content: 'true'
  };
  PlaceholderComponent(quail, test, Case, options);
};;
module.exports = DocumentTitleIsNotPlaceholder;
