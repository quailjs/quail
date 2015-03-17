quail.tabIndexFollowsLogicalOrder = function (quail, test, Case) {
  test.get('$scope').each(function () {
    var $local = $(this);
    var index = 0;
    $local.find('[tabindex]').each(function() {
      var $el = $(this);
      var tabindex = $el.attr('tabindex');
      if (parseInt(tabindex, 10) >= 0 && parseInt(tabindex, 10) !== index + 1) {
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
      index++;
    });
  });
};
