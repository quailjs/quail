quail.elementAttributesAreValid = function(quail, test, Case) {
	quail.components.htmlSource.getHtml(function(html, parsed) {
		if (!parsed) {
			return;
		}
		quail.components.htmlSource.traverse(parsed, function(element) {
			if (typeof element.raw === 'undefined' || !$.isArray(element.selector)) {
				return;
			}

      var failed = false, selector;
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

			//Element has mis-matched quotes
			var quotes = element.raw.match(/\'|\"/g);
			if (quotes && quotes.length % 2 !== 0) {
				test.add(Case({
					element: node,
					expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
					status: 'failed'
				}));
				failed = true;
			}

			//Element attributes not separated by a space
			if (element.raw.search(/([a-z]*)=(\'|\")([a-z\.]*)(\'|\")[a-z]/i) > -1) {
				test.add(Case({
					element: node,
					expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
					status: 'failed'
				}));
				failed = true;
			}

			//Element with space as an attribute is not surrounded by quotes
			var splitElement = element.raw.split('=');
			splitElement.shift();
			$.each(splitElement, function() {
				if (this.search(/\'|\"/) === -1 && this.search(/\s/i) > -1) {
					test.add(Case({
						element: node,
						expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
						status: 'failed'
					}));
					failed = true;
				}
			});

			// Passes.
			if (!failed) {
				test.add(Case({
					element: node,
					expected: (typeof node === 'object') && (node.nodeType === 1) && $(node).closest('.quail-test').data('expected') || null,
					status: 'passed'
				}));
			}
		});
	});
};
