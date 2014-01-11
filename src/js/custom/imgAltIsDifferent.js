quail.imgAltIsDifferent = function() {
  quail.html.find('img[alt][src]').each(function() {
    if($(this).attr('src') === $(this).attr('alt') || $(this).attr('src').split('/').pop() === $(this).attr('alt')) {
      quail.testFails('imgAltIsDifferent', $(this));
    }
  });
};
