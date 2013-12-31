quail.imgNonDecorativeHasAlt = function() {
  quail.html.find('img[alt]').each(function() {
    if(quail.isUnreadable($(this).attr('alt')) &&
       ($(this).width() > 100 || $(this).height() > 100)) {
         quail.testFails('imgNonDecorativeHasAlt', $(this));
       }
  });
};
