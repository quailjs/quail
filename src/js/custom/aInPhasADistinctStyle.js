quail.aInPHasADistinctStyle=function(quail, test, Case){

  /**
   * Function for just testing the elements text, without checking text of children
   * @returns {*|jQuery}
   */
  jQuery.fn.getElementText=function(){
    return $(this).clone()
      .children()
      .remove()
      .end()
      .text();
  };

  /**
   * Checks if an element has a border set
   * @param element
   * @returns {boolean}
   */
  function hasBorder(element){
    if ((element.outerWidth() - element.innerWidth() > 0) || (element.outerHeight() - element.innerHeight() > 0)) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Checks if the parent element is a native style element
   * @param parentElement
   * @returns {boolean}
   */
  function hasNativeStyle(parentElement){
    var nativeStyles=['b', 'strong', 'em', 'u'];
    var result=false;

    $.each(nativeStyles, function(index, item){
      if (parentElement.is(item) && parentElement.getElementText() === "") {
        result=true;
      }
    });
    return result;
  }

  test.get('$scope').find('p a').each(function(){
    var _case=Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });

    test.add(_case);
    var expected=$(this).closest('.quail-test').data('expected');
    if (!$(this).attr('href') || quail.cleanString($(this).attr('href')) === "") {
      _case.set({
        'expected': expected,
        'status': 'inapplicable'
      });
      return;
    }
    if (
      hasNativeStyle($(this).parent()) ||
      $(this).css('text-decoration') === 'underline' ||
      $(this).css('display') === 'block' ||
      ($(this).css('background-color') !== 'rgba(0, 0, 0, 0)' && $(this).css('background-color') !== $(this).closest('p').css('background-color')) ||
      hasBorder($(this)) ||
      $(this).children('img').length > 0
      ) {
      _case.set({
        'expected': expected,
        'status': 'passed'
      });
      return;
    } else {
      _case.set({
        'expected': expected,
        'status': 'failed'
      });
      return;
    }
  });
};
