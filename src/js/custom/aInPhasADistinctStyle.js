quail.aInPHasADistinctStyle=function(quail, test, Case){

  /**
   * Function for just testing the elements text, without checking text of children
   * @returns {*|jQuery}
   */
  function getElementText($elm){
    return $elm.clone()
      .children()
      .remove()
      .end()
      .text().trim();
  }

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
      if (parentElement.is(item) && getElementText(parentElement) === "") {
        result=true;
      }
    });
    return result;
  }


  function elmHasDistinctStyle($elm) {
    var result = false;
    var $p = $elm.closest('p').css;
    var styleProperties = ['text-decoration', 'font-weight', 'font-style'];

    if ($elm.css('background-color') === 'rgba(0, 0, 0, 0)') {
      styleProperties.push('background-color');
    }
    $.each(styleProperties, function (i, styleProp) {
      console.log(i, styleProp);
      if (styleProp === 'text-decoration') {
        console.log($elm, $elm.css(styleProp), $p.css(styleProp));
      }
      if (!result && $elm.css(styleProp) && $p.css(styleProp)) {
        result = true;
      }
    });

    return result || $elm.css('display') === 'block' || hasBorder($elm);
  }


  test.get('$scope').find('p a').each(function(){
    var $this = $(this);
    var $parent = $this.parent();
    var _case=Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });

    test.add(_case);
    var expected=$this.closest('.quail-test').data('expected');
    if (!$this.attr('href') || quail.cleanString($this.attr('href')) === "") {
      _case.set({
        'expected': expected,
        'status': 'inapplicable'
      });
      return;
    }


    if ($this.find('img').length >= 1 || // pass if there's an image
    elmHasDistinctStyle($this) || // pass if the style is distinct
    (getElementText($parent) === '' && elmHasDistinctStyle($parent))) { // pass if the parent style is distinct
      _case.set({
        'expected': expected,
        'status': 'passed'
      });

    } else {
      _case.set({
        'expected': expected,
        'status': 'failed'
      });
    }
  });
};
