quail.focusIndicatorVisible = function(quail, test, Case) {
  test.get('$scope').find(quail.focusElements).each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    var noFocus = {
      borderWidth : $(this).css('border-width'),
      borderColor : $(this).css('border-color'),
      backgroundColor : $(this).css('background-color'),
      boxShadow : $(this).css('box-shadow')
    };
    $(this).focus();
    if (noFocus.backgroundColor.trim() !== $(this).css('background-color').trim()) {
      $(this).blur();
      _case.set({
        'status': 'passed'
      });
      return;
    }

    var borderWidth = quail.components.convertToPx($(this).css('border-width'));
    if (borderWidth > 2 && borderWidth !== quail.components.convertToPx(noFocus.borderWidth)) {
      $(this).blur();
      _case.set({
        'status': 'passed'
      });
      return;
    }

    var boxShadow = ($(this).css('box-shadow') && $(this).css('box-shadow') !== 'none') ? $(this).css('box-shadow').match(/(-?\d+px)|(rgb\(.+\))/g) : false;
    if (boxShadow && $(this).css('box-shadow') !== noFocus.boxShadow && quail.components.convertToPx(boxShadow[3]) > 3) {
      $(this).blur();
      _case.set({
        'status': 'passed'
      });
      return;
    }
    $(this).blur();
    _case.set({
      'status': 'failed'
    });
  });
};
