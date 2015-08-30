/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

quail.formHasGoodErrorMessage = function (quail, test, Case, options) {

  var selector = 'form';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        var status;

        test.add(quail.lib.Case({
          element: this,
          status: 'cantTell'
        }));
      });
    }
  });
};