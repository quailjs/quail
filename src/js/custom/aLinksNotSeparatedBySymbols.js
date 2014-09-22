quail.aLinksNotSeparatedBySymbols = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var $link = $(this);
    if ($link.next('a').length) {
      var text = $link.get(0).nextSibling.wholeText;
      if (typeof text === 'string') {
        // The string between the links is composed of symbols.
        if (quail.strings.symbols.indexOf(text.toLowerCase().trim()) !== -1 ) {
          test.add(Case({
            element: this,
            'expected': $link.closest('.quail-test').data('expected'),
            'status': 'failed'
          }));
        }
      }
      // The string between the links is composed of words.
      else {
        test.add(Case({
          element: this,
          'expected': $link.closest('.quail-test').data('expected'),
          'status': 'passed'
        }));
      }
    }
    // If nothing follows the link, then there is nothing to test.
    else {
      test.add(Case({
        'status': 'inapplicable'
      }));
    }
  });
};
