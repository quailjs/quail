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
        expected: $scope.data('expected') || $scope.find('[data-expected]').data('expected'),
        // status: 'passed'
        status: (options.test ? 'inapplicable' : 'passed')
      }));
    }
    else {
      // Fails.
      candidates.each(function () {
        var status,
        $this = $(this);

        // If a test is defined, then use it
        if (options.test && !$this.is(options.test)) {
          status = 'passed';
        } else {
          status = 'failed';
        }

        test.add(quail.lib.Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: status
        }));
      });
    }
  });
};
