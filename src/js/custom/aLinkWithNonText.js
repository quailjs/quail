quail.aLinkWithNonText = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (!$(this).is('a:has(img, object, embed)[href]')) {
      _case.set({
        'status': 'inapplicable'
      });
      return;
    }
    if (!quail.isUnreadable($(this).text())) {
      _case.set({
        'status': 'passed'
      });
      return;
    }
    var unreadable = 0;
    $(this).find('img, object, embed').each(function() {
      if (($(this).is('img') && quail.isUnreadable($(this).attr('alt'))) ||
        (!$(this).is('img') && quail.isUnreadable($(this).attr('title')))) {
        unreadable++;
      }
    });
    if ($(this).find('img, object, embed').length === unreadable) {
      _case.set({
        'status': 'failed'
      });
    }
    else {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
