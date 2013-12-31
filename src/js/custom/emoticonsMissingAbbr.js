quail.emoticonsMissingAbbr = function() {
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    var $clone = $element.clone();
    $clone.find('abbr, acronym').each(function() {
      $(this).remove();
    });
    $.each($clone.text().split(' '), function(index, word) {
      if(quail.strings.emoticons.indexOf(word) > -1) {
        quail.testFails('emoticonsMissingAbbr', $element);
      }
    });
  });
};
