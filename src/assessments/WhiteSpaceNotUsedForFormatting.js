var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var WhiteSpaceNotUsedForFormatting = {
  run: function (test) {
    test.get('$scope')
      .find(TextSelectorComponent)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
      })
      .each(function () {
        var _case = test.add(Case({
          element: this
        }));
        if ($(this).find('br').length === 0) {
          _case.set({status: 'passed'});
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
          _case.set({status: 'failed'});
        }
        else {
          _case.set({status: 'cantTell'});
        }
      });
  },

  meta: {
replace: 'this'
  }
};
module.exports = WhiteSpaceNotUsedForFormatting;
