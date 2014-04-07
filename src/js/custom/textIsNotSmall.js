quail.textIsNotSmall = function(quail, test, Case) {
  test.get('$scope').find(quail.textSelector).each(function() {
    var fontSize = $(this).css('font-size');
    if (fontSize.search('em') > 0) {
      fontSize = quail.components.convertToPx(fontSize);
    }
    fontSize = parseInt(fontSize.replace('px', ''), 10);

    if (fontSize < 10) {
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
  });
};
