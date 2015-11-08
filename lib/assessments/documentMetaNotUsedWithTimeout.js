/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

var DocumentMetaNotUsedWithTimeout = function DocumentMetaNotUsedWithTimeout(quail, test, Case) {

  var selector = 'meta';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);

    if (!candidates.length) {
      test.add(Case({
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

        test.add(Case({
          element: this,
          status: status
        }));
      });
    }
  });
};;
module.exports = DocumentMetaNotUsedWithTimeout;