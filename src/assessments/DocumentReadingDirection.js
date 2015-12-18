/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var DocumentReadingDirection = {
  run: function (test) {

    var selector = [
      '[lang="he"]',
      '[lang="ar"]'
    ].join(', ');

    this.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          if (this.hasAttribute('dir') && (this.getAttribute('dir') || '') === 'rtl') {
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
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Reading direction of text is correctly marked',
      nl: 'De leesrichting van de tekst staat juist aangegeven'
    },
    description: {
      en: 'Where required, the reading direction of the document (for language that read in different directions), or portions of the text, must be declared.',
      nl: 'Voor talen die een andere leesrichting hebben, moet de leesrichting van (een deel van) de tekst in een document worden opgenomen.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'H34'
          ]
        }
      }
    },
    tags: [
      'document',
      'language'
    ]
  }
};
module.exports = DocumentReadingDirection;
