quail.closingTagsAreUsed = function() {
	quail.components.htmlSource.getHtml(function(html, parsed) {
		quail.components.htmlSource.traverse(parsed, function(element, childNumber, parent) {
			if(element.type === 'tag' &&
				typeof element.closingTag === 'undefined' &&
				!element.closingTag &&
				quail.selfClosingTags.indexOf(element.name.toLowerCase()) === -1) {
				quail.testFails('closingTagsAreUsed', quail.html.find(element.selector));
			}
		});
	});
};