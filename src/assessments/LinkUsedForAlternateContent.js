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

var LinkUsedForAlternateContent = {
  run: function (test, options) {
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('html', scope)
        .filter((element) => {
          let links = DOM.scry('link[rel="alternative"]', element);
          return links.length === 0;
        });
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.forEach(function (element) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Use a \"link\" element for alternate content',
      nl: 'Gebruik een \"link\"-element for andersoortige content'
    },
    description: {
      en: 'Documents which contain things like videos, sound, or other forms of media that are not accessible, should provide a <code>link</code> element with a \"rel\" attribute of \"alternate\" in the document header.',
      nl: 'Documenten die content zoals video\'s, geluid of andere niet-toegankelijke vormen van media bevatten, moeten een <code>link</code>-element met een \"rel\"-attribuut of \"alternate\" in de documentheaderlink aanbieden.'
    },
    guidelines: [

    ],
    tags: [
      'document'
    ]
  }
};
module.exports = LinkUsedForAlternateContent;
