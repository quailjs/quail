quail.elementAttributesAreValid = function() {
	quail.components.htmlSource.getHtml(function(html, parsed) {
		if (!parsed) {
			return;
		}
		quail.components.htmlSource.traverse(parsed, function(element) {
			if (typeof element.raw === 'undefined') {
				return;
			}
			var selector = element.selector.join('>').trim();
			//Element has mis-matched quotes
			var quotes = element.raw.match(/\'|\"/g);
			if (quotes && quotes.length % 2 !== 0) {
				quail.testFails('elementAttributesAreValid', quail.html.find(selector));
			}

			//Element attributes not separated by a space
			if (element.raw.search(/([a-z]*)=(\'|\")([a-z\.]*)(\'|\")[a-z]/i) > -1) {
				quail.testFails('elementAttributesAreValid', quail.html.find(selector));
			}

			//Element with space as an attribute is not surrounded by quotes
			var splitElement = element.raw.split('=');
			splitElement.shift();
			$.each(splitElement, function() {
				if (this.search(/\'|\"/) === -1 && this.search(/\s/i) > -1) {
					quail.testFails('elementAttributesAreValid', quail.html.find(selector));
				}
			});
		});
	});
};
