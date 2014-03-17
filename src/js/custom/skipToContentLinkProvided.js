quail.skipToContentLinkProvided = function() {
  var skipLinkFound = false;
  quail.html.find('a[href*="#"]').each(function() {
    var $link = $(this);
    $.each(quail.strings.skipContent, function() {
      if($link.text().search(this) > -1 &&
          quail.html.find('#' + $link.attr('href').split('#').pop()).length
          ) {
        $link.focus();
        if($link.is(':visible') && $link.css('visibility') !== 'hidden') {
          skipLinkFound = true;
        }
        $link.blur();
      }
    });
  });
  if(!skipLinkFound) {
    quail.testFails('skipToContentLinkProvided', quail.html);
  }
};