quail.elementsDoNotHaveDuplicateAttributes = function() {
	quail.components.htmlSource.getHtml(function(html, parsed) {
		if(!parsed) {
			return;
		}
		quail.components.htmlSource.traverse(parsed, function(element) {
			if(element.type !== 'tag') {
				return;
			}
			var selector = element.selector.join(' ');
			if(!quail.html.find(selector).length) {
				return;
			}
			if(typeof element.attributes !== 'undefined') {
				$.each(element.attributes, function(index, attribute) {
					if(attribute.length > 1) {
						quail.testFails('elementsDoNotHaveDuplicateAttributes',
							quail.html.find(selector).first(),
							{ attribute : index }
							);
					}
				});
			}
		});
	});
};
