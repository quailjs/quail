quail.appletContainsTextEquivalent = function(quail, test, Case) {
  test.get('$scope').find('applet[alt=""], applet:not(applet[alt])').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (quail.isUnreadable($(this).text())) {
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
