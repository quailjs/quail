quail.tablePositioningShouldNotChangeMeaning = function(quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    var _case = test.add(Case({
      element: this,
      expected: (function (element) {
        return quail.components.resolveExpectation(element);
      }(this))
    }));
    $(this).find('th, td').each(function() {
      if ($(this).css('position') !== 'relative' &&
        $(this).css('position') !== 'static' || (
          $(this).css('float') === 'right' ||
          $(this).css('float') === 'left'
        )) {
        _case.set({
          status : 'failed'
        });
      }
      else {
        _case.set({
          status : 'passed'
        });
      }
    });
  });
};
