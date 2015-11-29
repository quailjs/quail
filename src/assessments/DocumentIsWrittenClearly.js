var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var TextStatisticsComponent = require('TextStatisticsComponent');
var IsUnreadable = require('IsUnreadable');
var DocumentIsWrittenClearly = {
  run: function (test) {
    test.get('$scope')
      .find(TextSelectorComponent)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
      })
      .each(function () {
        var text = TextStatisticsComponent.cleanText($(this).text());
        var _case = Case({
          element: this
        });
        test.add(_case);
        if (IsUnreadable(text)) {
          _case.set({
            status: 'inapplicable'
          });
          return;
        }
        if (Math.round((206.835 - (1.015 * TextStatisticsComponent.averageWordsPerSentence(text)) - (84.6 * TextStatisticsComponent.averageSyllablesPerWord(text)))) < 60) {
          _case.set({
            status: 'failed'
          });
        }
        else {
          _case.set({
            status: 'passed'
          });
        }
      });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'The document should be written to the target audience and read clearly',
      nl: 'Het document moet geschreven zijn op het niveau van de doelgroep'
    },
    description: {
      en: 'If a document is beyond a 10th grade level, then a summary or other guide should also be provided to guide the user through the content.',
      nl: 'Als de inhoud van een document moeilijker is dan het vastgestelde taalniveau, moet een samenvatting of andere begeleiding worden toegevoegd om de gebruiker te helpen met de content.'
    },
    guidelines: {
      wcag: {
        '3.1.5': {
          techniques: [
            'G86'
          ]
        }
      }
    },
    tags: [
      'language',
      'content'
    ]
  }
};
module.exports = DocumentIsWrittenClearly;
