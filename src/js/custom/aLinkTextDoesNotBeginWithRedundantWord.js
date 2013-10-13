quail.aLinkTextDoesNotBeginWithRedundantWord = function() {
  var redundant = quail.loadString('redundant');
  quail.html.find('a').each(function() {
    var $link = $(this);
    var text = '';
    if($(this).find('img[alt]').length) {
      text = text + $(this).find('img[alt]:first').attr('alt');
    }
    text = text + $(this).text();
    text = text.toLowerCase();
    $.each(redundant.link, function(index, phrase) {
      if(text.search(phrase) > -1) {
        quail.testFails('aLinkTextDoesNotBeginWithRedundantWord', $link);
      }
    });
  });
};
