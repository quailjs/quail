'use strict';

quail.appletContainsTextEquivalentInAlt = function (quail, test, Case) {
  quail.components.placeholder(quail, test, Case, {
    selector: 'applet',
    attribute: 'alt',
    empty: true
  });
};