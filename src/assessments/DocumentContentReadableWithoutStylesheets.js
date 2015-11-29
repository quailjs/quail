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

var DocumentContentReadableWithoutStylesheets = {
  run: function (test) {
    this.get('$scope').each(function () {
      test.add(Case({
        element: undefined,
        status: 'untested'
      }));
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Content should be readable without style sheets',
      nl: 'Content moet zonder stylesheets leesbaar zijn'
    },
    description: {
      en: 'With all the styles for a page turned off, the content of the page should still make sense. Try to turn styles off in the browser and see if the page content is readable and clear.',
      nl: 'Ook als alle stijlen voor een pagina zijn uitgezet, moet de content van de pagina nog steeds betekenisvol zijn. Zet de stylesheets uit in de browser en controleer of de content nog steeds leesbaar en duidelijk is.'
    },
    guidelines: {
      508:  [
        'd'
      ],
      wcag: {
        '1.3.1': {
          techniques:  [
            'G140'
          ]
        },
        '1.4.5': {
          techniques:  [
            'G140'
          ]
        },
        '1.4.9': {
          techniques:  [
            'G140'
          ]
        }
      }
    },
    tags: [
      'document',
      'color'
    ]
  }
};
module.exports = DocumentContentReadableWithoutStylesheets;
