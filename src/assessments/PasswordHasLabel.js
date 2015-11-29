/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var LabelComponent = require('LabelComponent');

var PasswordHasLabel = {
  run: function (test, options) {
    options = options || {
      selector: 'input[type="password"]'
    };
    LabelComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = PasswordHasLabel;
