quail.emoticonsMissingAbbr = function() {
  quail.html.find(quail.textSelector + ':not(abbr, acronym)').each(function() {
    var $element = $(this);
    var $clone = $element.clone();
    $clone.find('abbr, acronym').each(function() {
      $(this).remove();
    });
    $.each($clone.text().split(' '), function(index, word) {
      if(word.search(quail.emoticonRegex) > -1 ) {
        console.log(word);
        quail.testFails('emoticonsMissingAbbr', $element);
      }
    });
  });
};
