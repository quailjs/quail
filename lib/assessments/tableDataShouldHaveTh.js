/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

quail.tableDataShouldHaveTh = function (quail, test, Case, options) {

  var selector = 'table';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        var status = 'failed';
        var hasHeading = $(this).find('th').length > 0;
        // If a test is defined, then use it
        if (hasHeading) {
          status = 'passed';
        }

        test.add(quail.lib.Case({
          element: this,
          status: status
        }));
      });
    }
  });
};