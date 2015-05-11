quail.colorFontContrast = function (quail, test, Case, options) {

  var colors    = quail.components.color.colors;
  var buildCase =  quail.components.color.buildCase;
  var id        = 'colorFontContrast';

  /**
   *
   */
  function colorFontContrast(test, Case, options, $this, element) {
    // Check text and background color using DOM.
    // Build a case.
    if (!colors.testElmContrast(options.algorithm, $this)) {
      buildCase(test, Case, element, 'failed', id, 'The font contrast of the text impairs readability');
    }
    else {
      buildCase(test, Case, element, 'passed', id, 'The font contrast of the text is sufficient for readability');
    }
  }


  test.get('$scope').each(function () {
    var textNodes = document.evaluate('descendant::text()[normalize-space()]', this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes = [];
    var textNode = textNodes.iterateNext();

    // Loop has to be separated. If we try to iterate and rund testCandidates
    // the xpath thing will crash because document is being modified.
    while (textNode) {
      if (quail.components.color.textShouldBeTested(textNode)) {
        nodes.push(textNode.parentNode);
      }
      textNode = textNodes.iterateNext();
    }

    if (nodes.length === 0) {
      buildCase(test, Case, null, 'inapplicable', '', 'There is no text to evaluate');
    }

    nodes.forEach(function (element) {
      colorFontContrast(test, Case, options, $(element), element);
    });
  });
};
