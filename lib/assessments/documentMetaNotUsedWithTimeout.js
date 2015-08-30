/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

quail.documentMetaNotUsedWithTimeout = function (quail, test, Case, options) {

  var selector = 'meta';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);

    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        var status = 'passed';

        if (this.hasAttribute('http-equiv') && this.getAttribute('http-equiv') === 'refresh') {
          if (this.hasAttribute('content') && (this.getAttribute('content') || '').length > 0) {
            status = 'failed';
          }
        }

        test.add(quail.lib.Case({
          element: this,
          status: status
        }));
      });
    }
  });
};