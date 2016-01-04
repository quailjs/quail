var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
const DOM = require('DOM');
var TextNodeFilterComponent = require('TextNodeFilterComponent');

var DoNotUseGraphicalSymbolToConveyInformation = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      // Passes and fails.
      DOM.scry(TextSelectorComponent, scope)
        .filter((element) =>
          !DOM.is(element, 'abbr') && !DOM.is(element, 'acronym')
        )
        .forEach(function (element) {
          var whiteList = '✓';
          var blackList = '?xo[]()+-!*xX';

          var text = DOM.text(element);

          // @todo add support for other languages.
          // Remove all alphanumeric characters.
          var textLeft = text.replace(/[\W\s]+/g, '');
          // If we have an empty string something is wrong.
          if (textLeft.length === 0) {
            // Unless if it's white listed.
            if (whiteList.indexOf(text) === -1) {
              test.add(Case({
                element: element,
                status: 'failed'
              }));
            }
          }
          // Check regularly used single character symbols.
          else if (text.length === 1 && blackList.indexOf(text) >= 0) {
            test.add(Case({
              element: element,
              status: 'failed'
            }));
          }
          else {
            test.add(Case({
              element: element,
              status: 'passed'
            }));
          }
        });
      // Not applicables.
      DOM.scry(TextSelectorComponent, scope)
        .filter('abbr, acronym')
        .filter(function (element) {
          return TextNodeFilterComponent(element);
        })
        .forEach(function (element) {
          test.add(Case({
            element: element,
            status: 'inapplicable'
          }));
        });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Using a graphical symbol alone to convey information',
      nl: 'Gebruik van alleen een grafisch symbool om informatie over te brengen'
    },
    description: {
      en: 'The objective of this technique is to show how using a graphical symbol to convey information can make content difficult to comprehend. A graphical symbol may be an image, an image of text or a pictorial or decorative character symbol (glyph) which imparts information nonverbally. Examples of graphical symbols include an image of a red circle with a line through it, a smiley face, or a glyph which represents a check mark, arrow, or other symbol but is not the character with that meaning. Assistive technology users may have difficulty determining the meaning of the graphical symbol. If a graphical symbol is used to convey information, provide an alternative using features of the technology or use a different mechanism that can be marked with an alternative to represent the graphical symbol. For example, an image with a text alternative can be used instead of the glyph.',
      nl: 'Het doel van deze techniek is te laten zien dat content moeilijker begrepen kan worden wanneer een grafisch symbool wordt gebruikt om informatie over te brengen. Een grafisch symbool kan een afbeelding, een afbeelding van tekst of een pictogram of decoratief teken zijn (glyph) dat non-verbaal informatie overbrengt. Voorbeelden hiervan zijn een rode cirkel met een lijn erdoorheen, een smiley of een vinkje, pijl of ander symbool dat niet noodzakelijkerwijs een duidelijke betekenis heeft. Gebruikers van hulpprogramma\'s hebben vaak moeite om de bedoeling van een grafisch symbool te duiden. Als een grafisch symbool gebruikt wordt om informatie over te brengen, biedt dan ook een (tekstueel) alternatief.'
    },
    guidelines: {
      wcag: {
        '1.3.3': {
          techniques: [
            'F26'
          ]
        }
      }
    },
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = DoNotUseGraphicalSymbolToConveyInformation;
