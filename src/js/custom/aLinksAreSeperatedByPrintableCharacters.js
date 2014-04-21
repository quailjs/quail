quail.aLinksAreSeparatedByPrintableCharacters = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var _case = test.add(Case({
      element: this
    }));
    var expected = $(this).closest('.quail-test').data('expected');
    // Only test if there's another a tag.
    if ($(this).next('a').length) {
      if (quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
        _case.set({
          'expected': expected,
          'status': 'failed'
        });
      }
      else {
        _case.set({
          'expected': expected,
          'status': 'passed'
        });
      }
    }
  });
};
