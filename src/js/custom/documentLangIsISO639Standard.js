quail.documentLangIsISO639Standard = function(quail, test, Case) {
  var $element = (test.get('$scope').is('html')) ?
    test.get('$scope') :
    test.get('$scope').find('html').first();
  var _case = Case({
    element: this,
    expected: ($element.closest('.quail-test').length) ?
      $element.closest('.quail-test').data('expected') :
      $element.data('expected')
  });

  test.add(_case);
  if (!$element.attr('lang')) {
    _case.set({
      'status': 'inapplicable'
    });
  }
  _case.set({
    'status': (quail.strings.languageCodes.indexOf($element.attr('lang')) === -1) ?
      'failed' :
      'passed'
  });
};
