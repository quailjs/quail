/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var DocumentTitleNotEmpty = {
  run: function (test, options) {
    options = options || {
      selector: 'head > title',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
replace: 'this'
  }
};
module.exports = DocumentTitleNotEmpty;
