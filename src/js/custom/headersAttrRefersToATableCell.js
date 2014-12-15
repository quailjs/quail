quail.headersAttrRefersToATableCell = function(quail, test, Case) {

  // Table cell headers without referred ids
  test.get('$scope').find('table').each(function() {

    var element = this;
    var _case = Case({
        element: element,
        expected: $(this).closest('.quail-test').data('expected')
      });
    test.add(_case);
    var elmHeaders = $(element).find('th[headers], td[headers]');

    if (elmHeaders.length === 0) {
      _case.set({
        'status': 'inapplicable'
      });
      return;
    } else {
      elmHeaders.each(function() {
        var headers = $(this).attr('headers').split(/\s+/);
        $.each(headers, function(index, item) {
          if (item === "" || $(element).find('th#' + item + ',td#' + item).length > 0) {
            _case.set({
              'status': 'passed'
            });
            return;
          } else {
            _case.set({
              'status': 'failed'
            });
            return;
          }
        });
      });
    }
  });
};
