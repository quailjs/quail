quail.KINGUseLongDateFormat = function (quail, test, Case) {

  function testDateFormat(index, element) {
    // Detect dates with several separators.
    var dateReg = /\d{1,2}([./-])\d{1,2}\1\d{2,4}/g;
    var elemChildNodes = element.childNodes;
    var issueOccured = false;

    // Lets find all the *direct* text node children.
    var textNodeChildren = [];
    var i = 0;
    var childCount;

    for (childCount = elemChildNodes.length; i < childCount; i++) {
      if (elemChildNodes[i].nodeType === Node.TEXT_NODE) {
        textNodeChildren.push(elemChildNodes[i]);
      }
    }

    // Now we're going to check if any text node matches the pattern.
    // Micro-optimization: check also if issueOccured == false, because we
    // are not reporting more than one issue occurence.
    for (i = 0; i < textNodeChildren.length && !issueOccured; i++) {
      var curTextContent = textNodeChildren[i].nodeValue;

      if ( dateReg.test( curTextContent ) ) {
        issueOccured = true;
      }
    }

    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    // Only test if there is one date in the wrong format and call it.
    _case.set({
      'status': issueOccured ? 'failed' : 'passed'
    });
  }
  test.get('$scope').find('p').each(testDateFormat);
};
