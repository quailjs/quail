var TableLayoutMakesSenseLinearized = function (quail, test, Case) {
  test.get('$scope').find('table').each(function () {
    if (!quail.isDataTable($(this))) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableLayoutMakesSenseLinearized;
