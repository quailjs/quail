var PlaceholderComponent = require('PlaceholderComponent');
var AppletContainsTextEquivalentInAlt = function (quail, test, Case) {
  PlaceholderComponent(quail, test, Case, {
    selector: 'applet',
    attribute: 'alt',
    empty: true
  });
};;
module.exports = AppletContainsTextEquivalentInAlt;
