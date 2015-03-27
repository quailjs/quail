quail.headerTooLong = function(quail, test, Case) {
  var headerMaxLength = 128;

  test.get('$scope').find('h1, h2, h3, h4, h5, h6').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    _case.set({
      'status': ($(this).text().replace(/^\s+|\s+$/gm,'').length > headerMaxLength) ?
        'failed' :
        'passed'
    });
  });
};
