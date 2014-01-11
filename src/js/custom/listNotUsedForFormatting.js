quail.listNotUsedForFormatting = function() {
  quail.html.find('ol, ul').each(function() {
    if($(this).find('li').length < 2) {
      quail.testFails('listNotUsedForFormatting', $(this));
    }
  });
};
