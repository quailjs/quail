/**
 * Utility object that runs text statistics, like sentence count,
 * reading level, etc.
 */
quail.textStatistics = {

  cleanText : function(text) {
    return text.replace(/[,:;()\-]/, ' ')
               .replace(/[\.!?]/, '.')
               .replace(/[ ]*(\n|\r\n|\r)[ ]*/, ' ')
               .replace(/([\.])[\. ]+/, '$1')
               .replace(/[ ]*([\.])/, '$1')
               .replace(/[ ]+/, ' ')
               .toLowerCase();
               
  },
  
  sentenceCount : function(text) {
    var copy = text;
    return copy.split('.').length + 1;
  },
  
  wordCount : function(text) {
    var copy = text;
    return copy.split(' ').length + 1;
  },
  
  averageWordsPerSentence : function(text) {
    return quail.textStatistics.wordCount(text) / quail.textStatistics.sentenceCount(text);
  },
  
  averageSyllablesPerWord : function(text) {
    var count = 0;
    var wordCount = quail.textStatistics.wordCount(text);
    if(!wordCount) {
      return 0;
    }
    $.each(text.split(' '), function(index, word) {
      count += quail.textStatistics.syllableCount(word);
    });
    return count / wordCount;
  },
  
  syllableCount : function(word) {
    var matchedWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                          .match(/[aeiouy]{1,2}/g);
    if(!matchedWord || matchedWord.length === 0) {
      return 1;
    }
    return matchedWord.length;
  }
};