var Case = require('Case');
var PlaceholderComponent = require('PlaceholderComponent');
var AppletContainsTextEquivalentInAlt = function (quail, test) {
  PlaceholderComponent(quail, test, Case, {
    selector: 'applet',
    attribute: 'alt',
    empty: true
  });
};
module.exports = AppletContainsTextEquivalentInAlt;
