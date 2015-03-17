quail.tabularDataIsInTable = function(quail, test, Case) {
  test.get('$scope').find('pre').each(function() {
    if ($(this).html().search('\t') >= 0) {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        status: 'passed'
      }));
    }
  });
};
