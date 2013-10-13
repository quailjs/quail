quail.documentIsWrittenClearly = function() {
  quail.html.find(quail.textSelector).each(function() {
    var text = quail.textStatistics.cleanText($(this).text());
    if(Math.round((206.835 - (1.015 * quail.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.textStatistics.averageSyllablesPerWord(text)))) < 60) {
      quail.testFails('documentIsWrittenClearly', $(this));
    }
  });
};
