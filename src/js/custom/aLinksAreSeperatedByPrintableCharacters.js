quail.aLinksAreSeperatedByPrintableCharacters = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').length && quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
      quail.testFails('aLinksAreSeperatedByPrintableCharacters', $(this));
    }
  });
};
