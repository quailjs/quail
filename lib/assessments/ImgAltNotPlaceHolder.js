/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var Case = require('Case');

var PlaceholderComponent = require('PlaceholderComponent');

var ImgAltNotPlaceHolder = function ImgAltNotPlaceHolder(test) {
  var options = {
    selector: 'img',
    attribute: 'alt'
  };
  PlaceholderComponent(quail, test, Case, options);
};
module.exports = ImgAltNotPlaceHolder;