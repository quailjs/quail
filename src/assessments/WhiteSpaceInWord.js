var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var WhiteSpaceInWord = {
  run: function (test) {
    var whitespaceGroup, nonWhitespace;
    test.get('$scope')
      .find(TextSelectorComponent)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
      })
      .each(function () {
        nonWhitespace = ($(this).text()) ? $(this).text().match(/[^\s\\]/g) : false;
        whitespaceGroup = ($(this).text()) ? $(this).text().match(/[^\s\\]\s[^\s\\]/g) : false;
        if (nonWhitespace &&
            whitespaceGroup &&
            whitespaceGroup.length > 3 &&
            whitespaceGroup.length >= (nonWhitespace.length / 2) - 2) {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        }
        else {
          test.add(Case({
            element: this,
            status: 'passed'
          }));
        }
      });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Whitespace should not be used between characters in a word',
      nl: 'Zet geen witruimte tussen letters in een woord'
    },
    description: {
      en: 'Using extra whitespace between letters in a word causes screen readers to not interpret the word correctly, use the letter-spacing CSS property instead.',
      nl: 'Het gebruik van witruimte tussen de letters van een woord, zorgen dat schermlezers het woord niet volledig kunnen lezen. Gebruik in plaats hiervan css om de ruimte tussen letters te bepalen.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'F32',
            'C8'
          ]
        }
      }
    },
    tags: [
      'content'
    ]
  }
};
module.exports = WhiteSpaceInWord;
