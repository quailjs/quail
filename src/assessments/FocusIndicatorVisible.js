var Case = require('Case');
var ConvertToPxComponent = require('ConvertToPxComponent');
var FocusElements = require('FocusElements');
var FocusIndicatorVisible = function (quail, test) {
  test.get('$scope').find(FocusElements).each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    var $el = $(this);
    var noFocus = {
      borderWidth: $el.css('border-width'),
      borderColor: $el.css('border-color'),
      backgroundColor: $el.css('background-color'),
      boxShadow: $el.css('box-shadow')
    };

    var listener = function () {
      if (noFocus.backgroundColor.trim() !== $el.css('background-color').trim()) {
        this.blur();
        _case.set({
          status: 'passed'
        });
        return;
      }

      var borderWidth = ConvertToPxComponent($el.css('border-width'));
      if (borderWidth > 2 && borderWidth !== ConvertToPxComponent(noFocus.borderWidth)) {
        this.blur();
        _case.set({
          status: 'passed'
        });
        return;
      }

      var boxShadow = ($el.css('box-shadow') && $el.css('box-shadow') !== 'none') ? $el.css('box-shadow').match(/(-?\d+px)|(rgb\(.+\))/g) : false;
      if (boxShadow && $el.css('box-shadow') !== noFocus.boxShadow && ConvertToPxComponent(boxShadow[3]) > 3) {
        this.blur();
        _case.set({
          status: 'passed'
        });
        return;
      }
      this.blur();
      _case.set({
        status: 'failed'
      });

      this.removeEventListener('focus', listener, false);
    };
    // Focus needs to be triggered through a web driver protocol.
    this.addEventListener('focus', listener, false);
  });
};
module.exports = FocusIndicatorVisible;
