quail.siteMap = function(quail, test, Case) {
  var set = true;
  var _case = Case({
    element: test.get('$scope').get(0),
    expected: test.get('$scope').data('expected')
  });
  test.add(_case);
  test.get('$scope').find('a').each(function() {
    if (_case.get('status') === 'passed') {
      return;
    }
    var text = $(this).text().toLowerCase();
    $.each(quail.strings.siteMap, function(index, string) {
      if (text.search(string) > -1) {
        set = false;
        return;
      }
    });
    if (set === false) {
      _case.set({
        'status': 'failed'
      });
      return;
    }

    if (set) {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
