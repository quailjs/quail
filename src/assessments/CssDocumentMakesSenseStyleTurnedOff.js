/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 *
 * This test did not test anything, so now it just returns untested.
 */
var Case = require('Case');

var CssDocumentMakesSenseStyleTurnedOff = {
  run: function (test) {
    test.get('scope').each(function () {
      test.add(Case({
        element: undefined,
        status: 'untested'
      }));
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The document must be readable with styles turned off',
      nl: 'Het document moet leesbaar zijn met stijlen uit'
    },
    description: {
      en: 'With all the styles for a page turned off, the content of the page should still make sense. Try to turn styles off in the browser and see if the page content is readable and clear.',
      nl: 'Als alle stijlen voor een pagina zijn uitgezet, moet de content van de pagina nog steeds betekenisvol zijn. Zet stijlen uit in de browser en controleer of de content op de pagina nog steeds leesbaar en duidelijk is.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'G140'
          ]
        },
        '1.4.5': {
          techniques: [
            'G140'
          ]
        },
        '1.4.9': {
          techniques: [
            'G140'
          ]
        }
      }
    },
    tags: [
      'color'
    ]
  }
};
module.exports = CssDocumentMakesSenseStyleTurnedOff;
