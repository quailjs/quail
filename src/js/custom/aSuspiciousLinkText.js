quail.aSuspiciousLinkText = function(quail, test, Case) {
  test.get('$scope').find('a').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (!$(this).attr('href')) {
      _case.set({
        'status': 'inapplicable'
      });
      return;
    }
    var text = $(this).text();
    $(this).find('img[alt]').each(function() {
      text = text + $(this).attr('alt');
    });
    if (quail.strings.suspiciousLinks.indexOf(quail.cleanString(text)) > -1) {
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
