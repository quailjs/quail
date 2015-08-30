'use strict';

quail.documentIsWrittenClearly = function (quail, test, Case) {
  test.get('$scope').find(quail.textSelector).filter(function (index, element) {
    return quail.components.textNodeFilter(element);
  }).each(function () {
    var text = quail.components.textStatistics.cleanText($(this).text());
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (quail.isUnreadable(text)) {
      _case.set({
        status: 'inapplicable'
      });
      return;
    }
    if (Math.round(206.835 - 1.015 * quail.components.textStatistics.averageWordsPerSentence(text) - 84.6 * quail.components.textStatistics.averageSyllablesPerWord(text)) < 60) {
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