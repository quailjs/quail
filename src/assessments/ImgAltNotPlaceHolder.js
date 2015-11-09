/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = function (quail, test) {
  var options = {
    selector: 'img',
    attribute: 'alt'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = ImgAltNotPlaceHolder;
