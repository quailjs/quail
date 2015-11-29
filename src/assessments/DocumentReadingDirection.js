/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var DocumentReadingDirection = {
  run: function (test) {

    var selector = [
      '[lang="he"]',
      '[lang="ar"]'
    ].join(', ');

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
          if (this.hasAttribute('dir') && (this.getAttribute('dir') || '') === 'rtl') {
            test.add(Case({
              element: this,
              status: 'passed'
            }));
          }
          else {
            test.add(Case({
              element: this,
              status: 'failed'
            }));
          }
        });
      }
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = DocumentReadingDirection;
