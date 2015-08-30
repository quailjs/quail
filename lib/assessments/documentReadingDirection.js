/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

quail.documentReadingDirection = function (quail, test, Case, options) {

  var selector = ['[lang="he"]', '[lang="ar"]'].join(', ');

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        if (this.hasAttribute('dir') && (this.getAttribute('dir') || '') === 'rtl') {
          test.add(quail.lib.Case({
            element: this,
            status: 'passed'
          }));
        } else {
          test.add(quail.lib.Case({
            element: this,
            status: 'failed'
          }));
        }
      });
    }
  });
};