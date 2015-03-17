quail.documentLangIsISO639Standard = function(quail, test, Case) {
  var $element = (test.get('$scope').is('html')) ?
    test.get('$scope') :
    test.get('$scope').find('html').first();

  var _case = Case({
    element: $element[0],
    expected: ($element.closest('.quail-test').length) ?
      $element.closest('.quail-test').data('expected') :
      $element.data('expected')
  });

  var langAttr = $element.attr('lang');
  var matchedLang = false; // Check to see if a languagecode was matched

  test.add(_case);
  if (!$element.is('html') || typeof langAttr === 'undefined') {
    _case.set({
      'status' : 'inapplicable'
    });
  } else {
    // Loop over all language codes, checking if the current lang attribute starts
    // with a value that's in the languageCodes array
    $.each(quail.strings.languageCodes, function (i, currentLangCode) {
      if (!matchedLang && langAttr.indexOf(currentLangCode) === 0) {
        matchedLang = true;
      }
    });

    if (!matchedLang) {
      _case.set({'status': 'failed'});

    } else if (langAttr.match(/^[a-z]{2}(-[A-Z]{2})?$/) === null) {
      _case.set({'status': 'failed'});

    } else {
      _case.set({'status': 'passed'});
    }
  }

};
