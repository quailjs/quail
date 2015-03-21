quail.aLinksNotSeparatedBySymbols = function (quail, test, Case) {
  test.get('$scope').find('a').each(function () {
    var $link = $(this);
    if ($link.next('a').length) {
      var text = $link.get(0).nextSibling.wholeText;
      // The string between the links is composed of symbols.
      if (typeof text === 'string' && quail.strings.symbols.indexOf(text.toLowerCase().trim()) !== -1) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
      // The string between the links is composed of words.
      else {
        test.add(Case({
          element: this,
          status: 'passed'
        }));
      }
    }
    // If nothing follows the link, then there is nothing to test.
    else {
      test.add(Case({
        element: this,
        status: 'inapplicable'
      }));
    }
  });
};
