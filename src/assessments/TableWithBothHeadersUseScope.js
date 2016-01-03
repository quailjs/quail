/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var TableWithBothHeadersUseScope = {
  run: function (test, options) {
    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry('th', scope)
        // Find all the th elements that don't have scope.
        .filter((element) => {
          let scope = element.getAttribute(element, 'scope');
          return !scope || scope.length === 0;
        })
        // of them, filter down to the th elements not in the first row.
        .filter((element) => {
          let parents = DOM.parents(elements);
          let row = parents.filter((element) => DOM.is('tr'))[0];
          let table = parents.filter((element) => DOM.is('table'))[0];
          let firstRow = DOM.scry('tr', table)[0];
          return row !=== firstRow;
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
    testability: 0.5,
    title: {
      en: 'Data tables with multiple headers should use the \"scope\" attribute',
      nl: 'Datatabellen met meerdere headers moeten het \"scope\"-attribuut gebruiken'
    },
    description: {
      en: 'Where there are table headers for both rows and columns, use the \"scope\" attribute to help relate those headers with their appropriate cells.',
      nl: 'Als er tabelkoppen zijn voor zowel rijen als kolommen, gebruik dan het \"scope\"-attribuut om het juiste verband te leggen tussen de koppen en bijbehorende cellen.'
    },
    guidelines: {
      508: [
        'h'
      ],
      wcag: {
        '1.3.1': {
          techniques: [
            'F91'
          ]
        }
      }
    },
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableWithBothHeadersUseScope;
