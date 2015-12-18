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

    this.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'passed';

          if (this.hasAttribute('longdesc')) {
            status = 'failed';
          }

          test.add(Case({
            element: this,
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
