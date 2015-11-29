/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = {
  run: function (test, options) {
    options = options || {
      selector: 'img',
      attribute: 'alt'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = ImgAltNotPlaceHolder;
