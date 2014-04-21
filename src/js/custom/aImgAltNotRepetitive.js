quail.aImgAltNotRepetitive = function(quail, test, Case) {
  test.get('$scope').find('a img[alt]').each(function() {
    var _case = test.add(Case({
      element: this
    }));
    var expected = $(this).closest('.quail-test').data('expected');
    if (quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
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
  });
};
