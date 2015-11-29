var Case = require('Case');
var TextStatisticsComponent = require('TextStatisticsComponent');
var ParagraphIsWrittenClearly = {
  run: function (test) {
    test.get('$scope').find('p').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var text = TextStatisticsComponent.cleanText($(this).text());
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
      en: 'The paragraph should be written to the target audience and read clearly',
      nl: 'Het paragraph moet geschreven zijn op het niveau van de doelgroep'
    },
    description: {
      en: 'If a paragraph is beyond a 10th grade level, then a summary or other guide should also be provided to guide the user through the content.',
      nl: 'Als de inhoud van een paragraph moeilijker is dan het vastgestelde taalniveau, moet een samenvatting of andere begeleiding worden toegevoegd om de gebruiker te helpen met de content.'
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
module.exports = ParagraphIsWrittenClearly;
