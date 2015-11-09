/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

var Case = require('Case');

var BlinkIsNotUsed = function BlinkIsNotUsed(quail, test) {

  var selector = 'blink';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      });
    }
  });
};
module.exports = BlinkIsNotUsed;