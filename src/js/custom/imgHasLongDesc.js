quail.imgHasLongDesc = function() {
  quail.html.find('img[longdesc]').each(function() {
    if($(this).attr('longdesc') === $(this).attr('alt') ||
       !quail.validURL($(this).attr('longdesc'))) {
        quail.testFails('imgHasLongDesc', $(this));
    }
  });
};
