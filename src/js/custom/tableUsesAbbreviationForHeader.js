quail.tableUsesAbbreviationForHeader = function(quail, test, Case) {
  test.get('$scope').find('th:not(th[abbr])').each(function() {
    if ($(this).text().length > 20) {
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
