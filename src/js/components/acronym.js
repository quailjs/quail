quail.components.acronym = function(testName, acronymTag) {
  var predefined = { };
  var alreadyReported = { };
  quail.html.find('acronym[title], abbr[title]').each(function() {
    predefined[$(this).text().toUpperCase()] = $(this).attr('title');
  });
  quail.html.find('p, div, h1, h2, h3, h4, h5').each(function(){
    var $el = $(this);
    var words = $(this).text().split(' ');
    if(words.length > 1 && $(this).text().toUpperCase() !== $(this).text()) {
      $.each(words, function(index, word) {
        word = word.replace(/[^a-zA-Zs]/, '');
        if(word.toUpperCase() === word &&
           word.length > 1 &&
           typeof predefined[word.toUpperCase()] === 'undefined') {
          if(typeof alreadyReported[word.toUpperCase()] === 'undefined') {
            quail.testFails(testName, $el, {acronym : word.toUpperCase()});
          }
          alreadyReported[word.toUpperCase()] = word;
        }
      });
    }
  });
};