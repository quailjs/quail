/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = function ImgAltNotPlaceHolder(quail, test, Case) {
  var options = {
    selector: 'img',
    attribute: 'alt'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = ImgAltNotPlaceHolder;