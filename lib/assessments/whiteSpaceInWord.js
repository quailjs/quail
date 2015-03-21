quail.whiteSpaceInWord = function (quail, test, Case) {
  var whitespaceGroup, nonWhitespace;
  test.get('$scope')
    .find(quail.textSelector)
    .filter(function (index, element) {
      return quail.components.textNodeFilter(element);
    })
    .each(function () {
      nonWhitespace = ($(this).text()) ? $(this).text().match(/[^\s\\]/g) : false;
      whitespaceGroup = ($(this).text()) ? $(this).text().match(/[^\s\\]\s[^\s\\]/g) : false;
      if (nonWhitespace &&
          whitespaceGroup &&
          whitespaceGroup.length > 3 &&
          whitespaceGroup.length >= (nonWhitespace.length / 2) - 2) {
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
