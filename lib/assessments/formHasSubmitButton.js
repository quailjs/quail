/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
quail.formHasSubmitButton = function (quail, test, Case, options) {

  var selector = 'input[type=submit], button[type=submit]';

  this.get('$scope').each(function () {
    var candidates = $(this).find('form');

    if (candidates.length === 0) {
      test.add(quail.lib.Case({
        element: this,
        status: 'inapplicable'
      }));
    }
    else {
      candidates.each(function () {
        var submitButton = $(this).find(selector);

        var status = (submitButton.length === 1) ? 'passed' : 'failed';

        test.add(quail.lib.Case({
          element: this,
          status: status
        }));
      });
    }
  });
};
