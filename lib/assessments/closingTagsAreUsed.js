quail.closingTagsAreUsed = function(quail, test, Case) {
  quail.components.htmlSource.getHtml(function(html, parsed) {
    quail.components.htmlSource.traverse(parsed, function(element) {
      if (element.type !== 'tag' || !$.isArray(element.selector)) {
        return;
      }
      var selector;
      // Use the element's ID if it has one.
      if (/#/.test(element.selector.slice(-1)[0])) {
        selector = element.selector.slice(-1)[0];
      }
      // Otherwise construct the path from the selector pieces.
      else {
        selector = element.selector.join(' > ');
      }

      // If selector matches a DOM node in the scope, get a reference to the
      // node, otherwise we'll have to back off to just giving details about
      // the node. This might happen if the DOM in the real page is
      // transformed too drastically from the parsed DOM.
      var node = $(selector, test.get('$scope')).get(0);
      if (!node) {
        node = element.raw || selector;
      }

      if (typeof element.closingTag === 'undefined' &&
            !element.closingTag &&
            quail.selfClosingTags.indexOf(element.name.toLowerCase()) === -1) {
        test.add(Case({
          element: node,
          // Only attempt to get an expectation for the testrunner if the node
          // is a DOM node.
          expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
          status: 'failed'
        }));
      }
      else {
        test.add(Case({
          element: node,
          // Only attempt to get an expectation for the testrunner if the node
          // is a DOM node.
          expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
          status: 'passed'
        }));
      }
    });
  });
};
