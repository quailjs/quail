quail.imgAltIsTooLong = function() {
  quail.html.find('img[alt]').each(function() {
    if($(this).attr('alt').length > 100) {
      quail.testFails('imgAltIsTooLong', $(this));
    }
  });
};
