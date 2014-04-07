quail.tabIndexFollowsLogicalOrder = function (quail, test, Case) {
  var index = 0;
  test.get('$scope').find('[tabindex]').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (parseInt($(this).attr('tabindex'), 10) >= 0 &&
        parseInt($(this).attr('tabindex'), 10) !== index + 1) {
      _case.set({
        'status': 'failed'
      });
    }
    else {
      _case.set({
        'status': 'passed'
      });
    }
    index++;
  });
};
