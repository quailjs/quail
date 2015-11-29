var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var WhiteSpaceInWord = {
  run: function (test) {
    var whitespaceGroup, nonWhitespace;
    test.get('$scope')
      .find(TextSelectorComponent)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
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
  },

  meta: {
replace: 'this'
  }
};
module.exports = WhiteSpaceInWord;
