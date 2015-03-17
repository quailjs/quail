quail.listOfLinksUseList = function(quail, test, Case) {
  var unreadableText = /(♦|›|»|‣|▶|.|◦|>|✓|◽|•|—|◾|\||\*|&bull;|&#8226;)/g;
  test.get('$scope').find('a').each(function() {
    var _case = test.add(Case({
      element: this
    }));
    var expected = $(this).closest('.quail-test').data('expected');
    // Only test if there's another a tag.
    if ($(this).next('a').length) {
      var nextText = $(this).get(0).nextSibling.wholeText.replace(unreadableText, '');
      if (!$(this).parent('li').length && quail.isUnreadable(nextText)) {
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
