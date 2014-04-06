quail.headersUseToMarkSections = function(quail, test, Case) {
  test.get('$scope').find('p').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var $paragraph = $(this);
    $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
      _case.set({
        'status': ($paragraph.text().trim() === $(this).text().trim()) ?
          'failed' :
          'passed'
      });
    });
  });

  test.get('$scope').find('ul, ol').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var $list = $(this);
    if ($list.prevAll(':header').length ||
      $list.find('li').length !== $list.find('li:has(a)').length) {
      _case.set({
        'status': 'passed'
      });
      return;
    }
    var isNavigation = true;
    $list.find('li:has(a)').each(function() {
      if ($(this).text().trim() !== $(this).find('a:first').text().trim()) {
        isNavigation = false;
      }
    });
    if (isNavigation) {
      _case.set({
        'status': 'failed'
      });
    }
  });
};
