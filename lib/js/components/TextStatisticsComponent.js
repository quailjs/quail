/**
 * Utility object that runs text statistics, like sentence count,
 * reading level, etc.
 */
'use strict';

var TextStatisticsComponent = {

  cleanText: function cleanText(text) {
    return text.replace(/[,:;()\-]/, ' ').replace(/[\.!?]/, '.').replace(/[ ]*(\n|\r\n|\r)[ ]*/, ' ').replace(/([\.])[\. ]+/, '$1').replace(/[ ]*([\.])/, '$1').replace(/[ ]+/, ' ').toLowerCase();
  },

  sentenceCount: function sentenceCount(text) {
    return text.split('.').length + 1;
  },

  wordCount: function wordCount(text) {
    return text.split(' ').length + 1;
  },

  averageWordsPerSentence: function averageWordsPerSentence(text) {
    return this.wordCount(text) / this.sentenceCount(text);
  },

  averageSyllablesPerWord: function averageSyllablesPerWord(text) {
    var that = this;
    var count = 0;
    var wordCount = that.wordCount(text);
    if (!wordCount) {
      return 0;
    }
    $.each(text.split(' '), function (index, word) {
      count += that.syllableCount(word);
    });
    return count / wordCount;
  },

  syllableCount: function syllableCount(word) {
    var matchedWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').match(/[aeiouy]{1,2}/g);
    if (!matchedWord || matchedWord.length === 0) {
      return 1;
    }
    return matchedWord.length;
  }
};
module.exports = TextStatisticsComponent;