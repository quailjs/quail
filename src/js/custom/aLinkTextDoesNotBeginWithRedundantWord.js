quail.aLinkTextDoesNotBeginWithRedundantWord = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var $link = $(this);
    var text = '';
    if ($(this).find('img[alt]').length) {
      text = text + $(this).find('img[alt]:first').attr('alt');
    }
    text = text + $(this).text();
    text = text.toLowerCase();
    var _case;
    $.each(quail.strings.redundant.link, function(index, phrase) {
      if (text.search(phrase) > -1) {
        _case = test.add(Case({
          element: this,
          'expected': $link.closest('.quail-test').data('expected'),
          'status': 'failed'
        }));
      }
    });
    // If the case didn't fail, then it passed.
    if (!_case) {
      test.add(Case({
        element: this,
        'expected': $link.closest('.quail-test').data('expected'),
        'status': 'passed'
      }));
    }
  });
};
