var KINGStrongList = function (quail, test, Case) {
  test.get('$scope').find('strong').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      status: $(this).parent().is('li') ? 'passed' : 'failed'
    });
  });
};
module.exports = KINGStrongList;
