quail.documentTitleIsShort = function (quail, test, Case) {
  var $title = test.get('$scope').find('head title:first');
  var _case = Case({
    element: $title
  });
  test.add(_case);
  if (!$title.length) {
    _case.set({
      status: 'inapplicable'
    });
    return;
  }
  _case.set({
    status: $title.text().length > 150 ? 'failed' : 'passed'
  });
};
