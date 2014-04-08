quail.tableSummaryIsNotTooLong = function(quail, test, Case) {
  test.get('$scope').find('table[summary]').each(function() {
    if ($(this).attr('summary').trim().length > 100) {
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
