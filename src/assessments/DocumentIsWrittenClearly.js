var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var TextStatisticsComponent = require('TextStatisticsComponent');
var IsUnreadable = require('IsUnreadable');
var DocumentIsWrittenClearly = function (quail, test) {
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
};
module.exports = DocumentIsWrittenClearly;
