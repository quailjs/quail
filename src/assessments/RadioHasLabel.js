/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var RadioHasLabel = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="radio"]'
    };
    LabelComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = RadioHasLabel;
