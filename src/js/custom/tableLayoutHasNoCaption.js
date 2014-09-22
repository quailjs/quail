quail.tableLayoutHasNoCaption = function (quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    if ($(this).find('caption').length) {
      if (!quail.isDataTable($(this))) {
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
    }
    else {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        'status': 'inapplicable'
      }));
    }
  });
};
