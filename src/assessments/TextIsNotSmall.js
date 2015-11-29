var Case = require('Case');
var ConvertToPxComponent = require('ConvertToPxComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var TextSelectorComponent = require('TextSelectorComponent');

var TextIsNotSmall = {
  run: function (test) {
    test.get('$scope')
      .find(TextSelectorComponent)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
      })
      .each(function () {
        var fontSize = $(this).css('font-size');
        if (fontSize.search('em') > 0) {
          fontSize = ConvertToPxComponent(fontSize);
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
  },

  meta: {
replace: 'this'
  }
};
module.exports = TextIsNotSmall;
