/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var AreaAltIdentifiesDestination = {
  run: function (test, options) {

    options = options || {};

    var selector = 'area';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope)
        .filter((element) => {
          let alt = DOM.getAttribute(element, 'alt');
          return !(alt && alt.length > 0);
        });
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.forEach(function (element) {
          var status = 'failed';

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
      en: 'All \"area\" elements must have an \"alt\" attribute which describes the link destination',
      nl: 'Alle \"area\"-elementen moeten een \"alt\"-attribuut hebben die de bestemming van de link beschrijft'
    },
    description: {
      en: 'All <code>area</code> elements within a <code>map</code> must have an \"alt\" attribute',
      nl: 'Alle <code>area</code>-elementen binnen een <code>map</code> moeten een \"alt\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'G74'
          ]
        }
      }
    },
    tags: [
      'objects',
      'applet',
      'content'
    ],
    options: {
      test: 'area[alt]'
    }
  }
};
module.exports = AreaAltIdentifiesDestination;
