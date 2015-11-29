/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var InputImageAltIsNotPlaceholder = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="image"]',
      attribute: 'alt'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = InputImageAltIsNotPlaceholder;
