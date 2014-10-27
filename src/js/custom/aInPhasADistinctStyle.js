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
    return (element.outerWidth() - element.innerWidth() > 0) ||(element.outerHeight() - element.innerHeight() > 0);
  }


  function elmHasDistinctStyle($elm) {
    var result = false;
    var $p = $elm.closest('p').css;
    var styleProperties = ['text-decoration', 'font-weight', 'font-style'];

    if ($elm.css('background-color') === 'rgba(0, 0, 0, 0)') {
      styleProperties.push('background-color');
    }
    console.log(styleProperties.length);
    $.each(styleProperties, function (i, styleProp) {
      console.log(styleProp);
      if (styleProp === 'text-decoration') {
        console.log($elm, $elm.css(styleProp), $p.css(styleProp));
      }
      if (!result && $elm.css(styleProp) && $p.css(styleProp)) {
        result = true;
      }
    });

    return result || $elm.css('display') === 'block' || hasBorder($elm);
  }


  test.get('$scope').find('p a').each(function() {
    var $this = $(this);
    var $parent = $this.parent();
    var _case=Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    if (!$this.attr('href') || quail.cleanString($this.attr('href')) === "") {
      _case.set({
        'status': 'inapplicable'
      });
      return;
    }


    if ($this.find('img').length >= 1 || // pass if there's an image
    elmHasDistinctStyle($this) || // pass if the style is distinct
    (getElementText($parent) === '' && elmHasDistinctStyle($parent))) { // pass if the parent style is distinct
      _case.set({'status': 'passed'});

    } else {
      _case.set({'status': 'failed'});
    }

  });
};
