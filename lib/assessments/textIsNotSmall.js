'use strict';

var ConvertToPxComponent = require('ConvertToPxComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var TextIsNotSmall = function TextIsNotSmall(quail, test, Case) {
  test.get('$scope').find(quail.textSelector).filter(function (index, element) {
    return TextNodeFilterComponent(element);
  }).each(function () {
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
    } else {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    }
  });
};;
module.exports = TextIsNotSmall;