quail.textIsNotSmall = function (quail, test, Case) {
  test.get('$scope')
    .find(quail.textSelector)
    .filter(function (index, element) {
      return quail.components.textNodeFilter(element);
    })
    .each(function () {
      var fontSize = $(this).css('font-size');
      if (fontSize.search('em') > 0) {
        fontSize = quail.components.convertToPx(fontSize);
      }
      fontSize = parseInt(fontSize.replace('px', ''), 10);

      if (fontSize < 10) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
      else {
        test.add(Case({
          element: this,
          status: 'passed'
        }));
      }
    });
};
