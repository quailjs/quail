'use strict';

var Case = require('Case');
var PlaceholderComponent = require('PlaceholderComponent');
var AppletContainsTextEquivalentInAlt = function AppletContainsTextEquivalentInAlt(test) {
  PlaceholderComponent(quail, test, Case, {
    selector: 'applet',
    attribute: 'alt',
    empty: true
  });
};
module.exports = AppletContainsTextEquivalentInAlt;