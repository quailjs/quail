quail.imgAltNotEmptyInAnchor = function() {
  quail.html.find('a img').each(function() {
    if(quail.isUnreadable($(this).attr('alt')) &&
       quail.isUnreadable($(this).parent('a:first').text())) {
          quail.testFails('imgAltNotEmptyInAnchor', $(this));
    }
  });
};
