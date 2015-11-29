/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var HeadersHaveText = {
  run: function (test, options) {
    options = options || {
      selector: 'h1, h2, h3, h4, h5, h6',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = HeadersHaveText;
