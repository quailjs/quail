/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var HeaderH6Format = function (quail, test) {

  var selector = 'h6';

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
        test.add(Case({
          element: this,
          status: 'cantTell'
        }));
      });
    }
  });
};
module.exports = HeaderH6Format;
