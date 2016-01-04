/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var AreaHasAltValue = {
  run: function (test) {

    var selector = 'area';

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
          var status;

          // If a test is defined, then use it
          if (element.hasAttribute('alt') && (element.getAttribute('alt') || '').length > 0) {
            status = 'passed';
          }
          else {
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
      en: 'All \"area\" elements must have an \"alt\" attribute',
      nl: 'Alle \"area\"-elementen moeten een \"alt\"-attribuut hebben'
    },
    description: {
      en: 'All <code>area</code> elements within a <code>map</code> must have an \"alt\" attribute.',
      nl: 'Alle <code>area</code>-elementen binnen een <code>map</code> moeten een \"alt\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'F65',
            'G74',
            'H24'
          ]
        },
        '1.4.3': {
          techniques: [
            'G145'
          ]
        }
      }
    },
    tags: [
      'imagemap',
      'content'
    ]
  }
};
module.exports = AreaHasAltValue;
