quail.imgImportantNoSpacerAlt = function() {
  quail.html.find('img[alt]').each(function() {
    var width = ($(this).width()) ? $(this).width() : parseInt($(this).attr('width'), 10);
    var height = ($(this).height()) ? $(this).height() : parseInt($(this).attr('height'), 10);
    if(quail.isUnreadable($(this).attr('alt').trim()) &&
       $(this).attr('alt').length > 0 &&
       width > 50 &&
       height > 50) {
        quail.testFails('imgImportantNoSpacerAlt', $(this));
    }
  });
};
