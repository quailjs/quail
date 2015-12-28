/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var DocumentLangNotIdentified = {
  run: function (test) {
    test.get('scope').each(function () {
      var lang = ('getAttribute' in this) && this.getAttribute('lang');
      if (lang && lang.length > 1) {
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
  },

  meta: {
    testability: 1,
    title: {
      en: 'The document must have a \"lang\" attribute',
      nl: 'Het document moet een \"lang\"-attribuut hebben'
    },
    description: {
      en: 'The document should have a default langauge, by setting the \"lang\" attribute in the <code>html</code> element.',
      nl: 'Het document moet een standaardtaal hebben, vastgelegd in het \"lang\"-attribuut in het <code>html</code>-element.'
    },
    guidelines: [

    ],
    tags: [
      'document',
      'language'
    ]
  }
};
module.exports = DocumentLangNotIdentified;
