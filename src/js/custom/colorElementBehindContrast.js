quail.colorElementBehindContrast = function (quail, test, Case, options) {
  test.get('$scope').each(function () {
    var textnodes = document.evaluate('descendant::text()[normalize-space()]', this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes = [];
    var text = textnodes.iterateNext();
    if (!text) {
      quail.components.color.buildCase(test, Case, null, 'inapplicable', '', 'There is no text to evaluate');
    }
    else {
      // Loop has to be separated. If we try to iterate and rund testCandidates
      // the xpath thing will crash because document is being modified.
      while (text) {
        nodes.push(text);
        text = textnodes.iterateNext();
      }
      nodes.forEach(function (textNode) {
        quail.components.color.testCandidates('colorElementBehindContrast', textNode, test, Case, options);
      });
    }
  });
};
