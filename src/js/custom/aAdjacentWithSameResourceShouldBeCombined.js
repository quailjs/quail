quail.aAdjacentWithSameResourceShouldBeCombined = function(quail, test, Case) {
  test.get('$scope').find('a + a').each(function() {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if ($(this).prev('a').attr('href') === $(this).attr('href')) {
      _case.set('status', 'failed');
    }
    else {
      _case.set('status', 'passed');
    }
  });
};
