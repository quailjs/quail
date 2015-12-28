/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var DocumentTitleDescribesDocument = {
  run: function (test) {

    var selector = 'head title';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      var status = (candidates.length === 1) ? 'passed' : 'failed';

      if (candidates.length === 0) {
        test.add(Case({
          element: undefined,
          status: status
        }));
      }
      else {
        candidates.forEach(function (element) {
          test.add(Case({
            element: element,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The title describes the document',
      nl: 'De titel beschrijft het document'
    },
    description: {
      en: 'The document title should actually describe the page. Often, screen readers use the title to navigate from one window to another.',
      nl: 'De documenttitel moet een beschrijving zijn van de pagina. Schermlezen gebruiken de titels van pagina\'s om van het ene naar het andere scherm te navigeren.'
    },
    guidelines: {
      wcag: {
        '2.4.2': {
          techniques: [
            'F25',
            'G88'
          ]
        }
      }
    },
    tags: [
      'document',
      'head'
    ]
  }
};
module.exports = DocumentTitleDescribesDocument;
