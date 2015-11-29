/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var InputTextHasLabel = {
  run: function (test, options) {
    options = options || {
      selector: 'input'
    };
    LabelComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = InputTextHasLabel;
