quail.aLinksNotSeparatedBySymbols = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').length &&
			quail.strings.symbols.indexOf($(this).get(0).nextSibling.wholeText.toLowerCase().trim()) !== -1 ) {
      quail.testFails('aLinksNotSeparatedBySymbols', $(this));
    }
  });
};
