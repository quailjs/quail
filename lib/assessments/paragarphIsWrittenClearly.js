quail.paragraphIsWrittenClearly = function (quail, test, Case) {
  test.get('$scope').find('p').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    var text = quail.components.textStatistics.cleanText($(this).text());
    if (Math.round((206.835 - (1.015 * quail.components.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.components.textStatistics.averageSyllablesPerWord(text)))) < 60) {
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
