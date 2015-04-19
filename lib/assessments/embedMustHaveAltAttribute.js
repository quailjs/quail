/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
quail.embedMustHaveAltAttribute = function (quail, test, Case, options) {

  var selector = 'embed';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    }
    else {
      candidates.each(function () {
        var status = 'failed';
        var alt = this.getAttribute('alt');
        if (alt && typeof alt === 'string' && alt.length > 0) {
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
