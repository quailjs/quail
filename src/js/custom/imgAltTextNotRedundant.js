quail.imgAltTextNotRedundant = function(quail, test, Case) {
  var altText = {};
  test.get('$scope').find('img[alt]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (typeof altText[$(this).attr('alt')] === 'undefined') {
      altText[$(this).attr('alt')] = $(this).attr('src');
    }
    else {
      if (altText[$(this).attr('alt')] !== $(this).attr('src')) {
        _case.set({
          'status': 'failed'
        });
      }
      else {
        _case.set({
          'status': 'passed'
        });
      }
    }
  });
};
