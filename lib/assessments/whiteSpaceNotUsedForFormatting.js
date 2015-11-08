'use strict';

var TextNodeFilterComponent = require('TextNodeFilterComponent');
var WhiteSpaceNotUsedForFormatting = function WhiteSpaceNotUsedForFormatting(quail, test, Case) {
  test.get('$scope').find(quail.textSelector).filter(function (index, element) {
    return TextNodeFilterComponent(element);
  }).each(function () {
    var _case = test.add(Case({
      element: this
    }));
    if ($(this).find('br').length === 0) {
      _case.set({ status: 'passed' });
      return;
    }
    var lines = $(this).html().toLowerCase().split(/(<br\ ?\/?>)+/);
    var lineCount = 0;
    $.each(lines, function (index, line) {
      if (line.search(/(\s|\&nbsp;) {2,}/g) !== -1) {
        lineCount++;
      }
    });
    if (lineCount > 1) {
      _case.set({ status: 'failed' });
    } else {
      _case.set({ status: 'cantTell' });
    }
  });
};;
module.exports = WhiteSpaceNotUsedForFormatting;