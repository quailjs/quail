/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var FormButtonsHaveValue = function (test) {

  var selector = 'input[type=button], input[type=submit], input[type=reset]';

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

        // If the button has a value, it passes.
        var val = this.getAttribute('value');
        if (val && typeof val === 'string' && val.length > 0) {
          status = 'passed';
        }

        test.add(Case({
          element: this,
          status: status
        }));
      });
    }
  });
};
module.exports = FormButtonsHaveValue;
