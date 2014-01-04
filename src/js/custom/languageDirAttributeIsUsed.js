quail.languageDirAttributeIsUsed = function() {
	quail.html.find(quail.textSelector).each(function() {
		var matches = $(this).text().match(quail.rtlCharacters);
		if(!matches) {
			return;
		}
		matches = matches.length;
		$(this).find('[dir=rtl]').each(function() {
			var childMatches = $(this).text().match(quail.rtlCharacters);
			if(childMatches) {
				matches = matches - childMatches.length;
			}
		});
		if(matches > 0) {
			quail.testFails('languageDirAttributeIsUsed', $(this));
		}
	});
};