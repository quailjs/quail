/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var IframeMustNotHaveLongdesc = {
  run: function (test) {

    var selector = 'iframe';

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

          if (element.hasAttribute('longdesc')) {
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
    testability: 1,
    title: {
      en: 'Inline frames (\"iframes\") should not have a \"longdesc\" attribute',
      nl: 'Inline frames (\"iframes\") krijgen geen \"longdesc\"-attribuut'
    },
    description: {
      en: 'Inline frames (iframe) should not have a \"longdesc\" attribute.',
      nl: 'Inline frames (\"iframes\") krijgen geen \"longdesc\"-attribuut.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'iframe',
      'content'
    ]
  }
};
module.exports = IframeMustNotHaveLongdesc;
