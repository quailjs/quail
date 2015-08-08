quail.aImgAltNotRepetitive = function(quail, test, Case) {
  test.get('$scope').find('a img[alt]').each(function() {
    var _case = test.add(Case({
      element: this
    }));
    var expected = $(this).closest('.quail-test').data('expected');
    var alt      = quail.cleanString($(this).attr('alt'));
    var linkText = quail.cleanString($(this).closest('a').text());

    if (alt.length > 0 && linkText.indexOf(alt) !== -1) {
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
