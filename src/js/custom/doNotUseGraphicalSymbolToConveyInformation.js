quail.doNotUseGraphicalSymbolToConveyInformation = function() {
  quail.html.find(quail.textSelector + ':not(abbr, acronym)').each(function() {
    var whiteList = '✓';
    var blackList = '?xo[]()+-!*xX';

    var text = $(this).text();

    // @todo add support for other languages.
    // Remove all alphanumeric characters.
    var textLeft = text.replace(/[\W\s]+/g, '');
    // If we have an empty string something is wrong.
    if (textLeft.length === 0) {
      // Unless if it's white listed.
      if (whiteList.indexOf(text) === -1) {
        quail.testFails('doNotUseGraphicalSymbolToConveyInformation', $(this));
      }
    }

    if (text.length === 1) {
      // Check regularly used single character symbols.
      if (blackList.indexOf(text) >= 0) {
        quail.testFails('doNotUseGraphicalSymbolToConveyInformation', $(this));
      }
    }
  });
};
