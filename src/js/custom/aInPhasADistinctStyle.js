quail.aInPHasADistinctStyle=function(quail, test, Case){

  /**
   * Checks if an element has a border set
   * @param element
   * @returns {boolean}
   */
  function hasBorder(element) {
    return (element.outerWidth() - element.innerWidth() > 0) ||
    (element.outerHeight() - element.innerHeight() > 0);
  }

  /**
   * Test if two elements have a distinct style from it's ancestor
   * @param  {jQuery node} $elm
   * @param  {jQuery node} $parent
   * @return {boolean}
   */
  function elmHasDistinctStyle($elm, $parent) {
    var result = false;
    var styleProperties = ['font-weight', 'font-style'];
    var textDecoration = $elm.css('text-decoration');

    if (textDecoration !== 'none' &&
    textDecoration !== $parent.css('text-decoration')) {
      result = true;
    }

    if ($elm.css('background-color') !== 'rgba(0, 0, 0, 0)') {
      styleProperties.push('background');
    }

    $.each(styleProperties, function (i, styleProp) {
      if (!result && $elm.css(styleProp) !== $parent.css(styleProp)) {
        result = true;
      }
    });

    return result  || hasBorder($elm);
  }

  function elmHasDistinctPosition($elm) {
    var isBlock = ($elm.css('display') === 'block');
    var position = $elm.css('position');
    var isPositioned = position !== 'relative' && position !== 'static';
    return isBlock || isPositioned;
  }

  // Ignore links where the p only contains white space, <, >, |, \, / and - chars
  var allowedPText = /^([\s|-]|>|<|\\|\/|&(gt|lt);)*$/i;

  test.get('$scope').each(function () {
    var $scope = $(this);
    var anchors = $scope.find('p a[href]:visible');

    anchors.each(function () {
      var $this = $(this);
      var $p = $this.closest('p');
      var $parent = $this.parent();

      var _case=Case({
        element: this,
        expected: $this.closest('.quail-test').data('expected')
      });
      test.add(_case);

      var aText = $this.text().trim();

      // Get all text of the p element with all anchors removed
      var pText = $p.clone().find('a[href]').remove().end().text();

      if (aText === '' || pText.match(allowedPText)) {
        _case.set('status', 'inapplicable');

      } else if ($this.css('color') === $p.css('color')) {
        _case.set('status', 'passed');

      } else if (elmHasDistinctStyle($this, $p)) {
        _case.set('status', 'passed');

      } else if (elmHasDistinctPosition($this)) {
        _case.set('status', 'passed');

      } else if ($this.find('img').length > 0) {
        _case.set('status', 'passed');

      } else if ($parent.text().trim() === aText &&
      elmHasDistinctStyle($parent, $p)) {
        _case.set('status', 'passed');

      } else {
        _case.set('status', 'failed');
      }
    });

  });

};
