quail.elementsDoNotHaveDuplicateAttributes = function() {
	quail.components.htmlSource.getHtml(function(html, parsed) {
		if(!parsed) {
			return;
		}
		quail.components.htmlSource.traverse(parsed, function(element) {
			if(element.type !== 'tag') {
				return;
			}
			var selector = element.selector.join('>');
			if(!$.contains(quail.html.get(0), $(selector).get(0))) {
				return;
			}
			if(typeof element.attributes !== 'undefined') {
				$.each(element.attributes, function(index, attribute) {
					if(attribute.length > 1) {
						quail.testFails('elementsDoNotHaveDuplicateAttributes',
							$(selector).first(),
							{ attribute : index }
							);
					}
				});
			}
		});
	});
};
