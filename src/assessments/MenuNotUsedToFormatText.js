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

var MenuNotUsedToFormatText = {
  run: function (test) {

    var selector = 'menu:not(menu li:parent(menu))';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';

          test.add(Case({
            element: this,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Menu elements should not be used for formatting',
      nl: 'Menu-elementen worden niet gebruikt voor opmaak'
    },
    description: {
      en: 'Menu is a deprecated tag, but is still honored in a transitional DTD. Menu tags are to provide structure for a document and should not be used for formatting. If a menu tag is to be used, it should only contain an ordered or unordered list of links.',
      nl: 'Menu is een afgekeurd tag, maar wordt nog wel gebruikt om structuur aan een document te geven. Het mag niet worden gebruikt voor opmaak. Als een menu-tag wordt gebruikt, mag het alleen bulleted of genummerde lijsten bevatten.'
    },
    guidelines: [

    ],
    tags: [
      'list',
      'content'
    ]
  }
};
module.exports = MenuNotUsedToFormatText;
