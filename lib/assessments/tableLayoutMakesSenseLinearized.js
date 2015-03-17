quail.tableLayoutMakesSenseLinearized = function(quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    if (!quail.isDataTable($(this))) {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        status: 'failed'
      }));
    }
  });
};
