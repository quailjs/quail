quail.documentVisualListsAreMarkedUp = function (quail, test, Case) {
  var symbols = /(<br(\/)?>)(\s)(♦|›|»|‣|▶|.|◦|✓|◽|•|—|◾|\||\*|&bull;|&#8226;|[0-9].|\(?[0-9]\)|[\u25A0-\u25FF]|(?:[IXC][MD]|D?C{0,4}))/i;
  test.get('$scope').find(quail.textSelector).each(function () {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var matches = $(this).html().match(symbols);
    _case.set({
      status: (matches && matches.length > 2) ? 'failed' : 'passed'
    });
  });
};
