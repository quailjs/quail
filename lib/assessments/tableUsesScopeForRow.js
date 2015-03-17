quail.tableUsesScopeForRow = function(quail, test, Case) {
  test.get('$scope').find('table').each(function() {
    $(this).find('td:first-child').each(function() {
      var $next = $(this).next('td');
      if (($(this).css('font-weight') === 'bold' && $next.css('font-weight') !== 'bold') ||
           ($(this).find('strong').length && !$next.find('strong').length)) {
        test.add(Case({
          element: this,
          expected: (function (element) {
            return quail.components.resolveExpectation(element);
          }(this)),
          status: 'failed'
        }));
      }
    });
    $(this).find('td:last-child').each(function() {
      var $prev = $(this).prev('td');
      if (($(this).css('font-weight') === 'bold' && $prev.css('font-weight') !== 'bold') ||
          ($(this).find('strong').length && !$prev.find('strong').length)) {
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
