/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 *
 * This test did not test anything, so now it just returns untested.
 */
'use strict';

quail.documentContentReadableWithoutStylesheets = function (quail, test, Case) {
  this.get('$scope').each(function () {
    test.add(quail.lib.Case({
      element: undefined,
      status: 'untested'
    }));
  });
};