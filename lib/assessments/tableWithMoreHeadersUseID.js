quail.tableWithMoreHeadersUseID = function(quail, test, Case) {
  test.get('$scope').find('table:has(th)').each(function() {
    var $table = $(this);
    var rows = 0;
    $table.find('tr').each(function() {
      if ($(this).find('th').length) {
        rows++;
      }
      if (rows > 1 && !$(this).find('th[id]').length) {
        test.add(Case({
          element: this,
          expected: (function (element) {
            return quail.components.resolveExpectation(element);
          }(this)),
          status: 'failed'
        }));
      }
    });
  });
};
