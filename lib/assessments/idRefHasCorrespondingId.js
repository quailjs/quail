quail.idRefHasCorrespondingId = function (quail, test, Case) {
  test.get('$scope').find('label[for], *[aria-activedescendant]').each(function () {
    var $this = $(this);
    var _case = Case({
      element: this
    });
    test.add(_case);

    var find = $this.attr('for') || $this.attr('aria-activedescendant');
    if (test.get('$scope').find('#' + find).length === 0) {
      _case.set({
        status: 'failed'
      });
    }
    else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
