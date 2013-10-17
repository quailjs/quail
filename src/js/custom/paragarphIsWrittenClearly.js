quail.paragarphIsWrittenClearly = function() {
  quail.html.find('p').each(function() {
    var text = quail.components.textStatistics.cleanText($(this).text());
    if(Math.round((206.835 - (1.015 * quail.components.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.components.textStatistics.averageSyllablesPerWord(text)))) < 60) {
      quail.testFails('paragarphIsWrittenClearly', $(this));
    }
  });
};
