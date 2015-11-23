var Case = require('Case');
var RedundantStringsComponent = require('RedundantStringsComponent');
var FormWithRequiredLabel = function (test) {
  var redundant = RedundantStringsComponent;
  var lastStyle, currentStyle = false;
  redundant.required[redundant.required.indexOf('*')] = /\*/g;
  test.get('$scope').each(function () {
    var $local = $(this);
    $local.find('label').each(function () {
      var text = $(this).text().toLowerCase();
      var $label = $(this);
      var _case = test.add(Case({
        element: this
      }));
      for (var word in redundant.required) {
        if (text.search(word) >= 0 && !test.get('$scope').find('#' + $label.attr('for')).attr('aria-required')) {
          _case.set({
            status: 'failed'
          });
        }
      }
      currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
      if (lastStyle && currentStyle !== lastStyle) {
        _case.set({
          status: 'failed'
        });
      }
      lastStyle = currentStyle;
      if (typeof _case.get('status') === 'undefined') {
        _case.set({
          status: 'passed'
        });
      }
    });
  });
};
module.exports = FormWithRequiredLabel;
