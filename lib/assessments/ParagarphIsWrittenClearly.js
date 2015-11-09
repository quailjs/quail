'use strict';

var Case = require('Case');
var TextStatisticsComponent = require('TextStatisticsComponent');
var ParagraphIsWrittenClearly = function ParagraphIsWrittenClearly(quail, test) {
  test.get('$scope').find('p').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    var text = TextStatisticsComponent.cleanText($(this).text());
    if (Math.round(206.835 - 1.015 * TextStatisticsComponent.averageWordsPerSentence(text) - 84.6 * TextStatisticsComponent.averageSyllablesPerWord(text)) < 60) {
      _case.set({
        status: 'failed'
      });
    } else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
module.exports = ParagraphIsWrittenClearly;