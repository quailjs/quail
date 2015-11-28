/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = function (test) {
  var options = {
    selector: 'img',
    attribute: 'alt'
  };
  PlaceholderComponent(test, options);
};
module.exports = ImgAltNotPlaceHolder;
