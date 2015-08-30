/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
quail.documentHasTitleElement = function (quail, test, Case, options) {

  var selector = 'head title';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (candidates.length === 1) {
      test.add(quail.lib.Case({
        element: candidates.get(0),
        status: 'passed'
      }));
    }
    else if (candidates.length === 0) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'failed'
      }));
    }
    else if (candidates.length > 1) {
      candidates.each(function () {
        test.add(quail.lib.Case({
          element: this,
          status: 'failed'
        }));
      });
    }
  });
};
