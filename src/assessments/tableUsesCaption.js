/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var TableUsesCaption = function (quail, test, Case) {

  var selector = 'table';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(Case({
        element: undefined,
        status: 'inapplicable'
      }));
    }
    else {
      candidates.each(function () {
        var status = 'failed';
        var hasCaption = $(this).find('caption').length === 1;

        // If a test is defined, then use it
        if (hasCaption) {
          status = 'passed';
        }

        test.add(Case({
          element: this,
          status: status
        }));
      });
    }
  });
};;
module.exports = TableUsesCaption;
