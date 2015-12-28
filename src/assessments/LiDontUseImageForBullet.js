/**
 * @todo Needs refinement.
 *
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var LiDontUseImageForBullet = {
  run: function (test) {

    var selector = 'li';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'passed';

          if ($(element).children('img').length > 0) {
            status = 'failed';
          }

          test.add(Case({
            element: element,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    guidelines: [

    ],
    tags: [
      'list',
      'content'
    ]
  }
};
module.exports = LiDontUseImageForBullet;
