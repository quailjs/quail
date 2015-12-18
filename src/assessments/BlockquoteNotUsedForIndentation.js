/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var BlockquoteNotUsedForIndentation = {
  run: function (test) {

    var selector = 'blockquote';

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

          if (this.hasAttribute('cite') && (this.getAttribute('cite') || '').length > 0) {
            test.add(Case({
              element: this,
              status: 'passed'
            }));
          }
          else {
            test.add(Case({
              element: this,
              status: 'cantTell'
            }));
          }
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'The \"blockquote\" tag should not be used just for indentation',
      nl: 'De \"blockquote\"-tag mag niet gebruikt worden om in te springen'
    },
    description: {
      en: 'Blockquote tags are for long-form quotes, and should not be used to indent paragraphs. Use CSS to indent the paragraph instead.',
      nl: 'Blockquotes zijn bedoeld voor lange stukken geciteerde tekst, en niet om tekst te laten inspringen.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H49'
          ]
        }
      }
    },
    tags: [
      'blockquote',
      'content'
    ]
  }
};
module.exports = BlockquoteNotUsedForIndentation;
