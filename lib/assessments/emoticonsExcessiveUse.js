quail.emoticonsExcessiveUse = function (quail, test, Case) {
  test.get('$scope')
    .find(quail.textSelector)
    .filter(function (index, element) {
      return quail.components.textNodeFilter(element);
    })
    .each(function () {
      var count = 0;
      var _case = Case({
        element: this
      });
      test.add(_case);
      $.each($(this).text().split(' '), function (index, word) {
        if (word.search(quail.emoticonRegex) > -1) {
          count++;
        }
      });
      if (count === 0) {
        _case.set({
          status: 'inapplicable'
        });
      }
      else {
        _case.set({
          status: (count > 4) ? 'failed' : 'passed'
        });
      }
    });
};
