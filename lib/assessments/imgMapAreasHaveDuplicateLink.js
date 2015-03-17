quail.imgMapAreasHaveDuplicateLink = function (quail, test, Case) {
  var links = { };
  test.get('$scope').find('a').each(function() {
    links[$(this).attr('href')] = $(this).attr('href');
  });
  test.get('$scope').find('img[usemap]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var $image = $(this);
    var $map = test.get('$scope').find($image.attr('usemap'));
    if (!$map.length) {
      $map = test.get('$scope').find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
    }
    if ($map.length) {
      $map.find('area').each(function() {
        if (typeof links[$(this).attr('href')] === 'undefined') {
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
    }
    else {
      _case.set({
        'status': 'inapplicable'
      });
    }
  });
};
