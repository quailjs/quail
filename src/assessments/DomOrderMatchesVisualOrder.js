/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var DomOrderMatchesVisualOrder = {
  run: function (test, options) {

    options = options || {};

    $.expr[':'].quailCss = function (obj, index, meta) {
      var args = meta[3].split(/\s*=\s*/);
      return $(obj).css(args[0]).search(args[1]) > -1;
    };

    var selector = '*:quailCss(position=absolute), *:quailCss(position=fixed), *:quailCss(float=right), *:quailCss(float=left)';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: (options.test ? 'inapplicable' : 'passed')
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(this).is(options.test)) {
            status = 'passed';
          }
          else {
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
    testability: 0.5,
    title: {
      en: 'Ensure that the visual order of the page matches the DOM',
      nl: 'Zorg ervoor dat de visuele ordening van de pagina overeenkomt met de DOM'
    },
    description: {
      en: 'When using positioning techniques, make sure that the visual order of the page matches the DOM.',
      nl: 'Wanneer je gebruik maakt van positioneringstechnieken, zorg er dan voor dat de visuele ordening van de pagina overeenkomt met de DOM.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'C27'
          ]
        },
        '2.4.3': {
          techniques: [
            'C27'
          ]
        }
      }
    },
    tags: [
      'content'
    ]
  }
};
module.exports = DomOrderMatchesVisualOrder;
