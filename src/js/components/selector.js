/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
quail.components.selector = function (quail, test, Case, options) {
  this.get('$scope').each(function() {
    var $scope = $(this);
    var candidates = $(this).find(options.selector);
    // Passes.
    if (!candidates.length) {
      // Passes.
      test.add(quail.lib.Case({
        element: undefined,
        selector: options.selector,
        status: 'passed'
      }));
    }
    else {
      // Fails.
      candidates.each(function () {
        // Get the data-expected attribute.
        test.add(quail.lib.Case({
          element: this,
          selector: options.selector,
          status: 'failed'
        }));
      });
    }
  });
};
