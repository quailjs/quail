quail.languageDirAttributeIsUsed = function() {
	var currentDirection = (quail.html.attr('dir')) ? quail.html.attr('dir').toLowerCase() : 'ltr';
	var oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
	quail.html.find(quail.textSelector).each(function() {
		currentDirection = ($(this).attr('dir')) ? $(this).attr('dir').toLowerCase() : currentDirection;
		if(typeof quail.textDirection[currentDirection] === 'undefined') {
			currentDirection = 'ltr';
		}
		oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
		var matches = $(this).text().match(quail.textDirection[currentDirection]);
		if(!matches) {
			return;
		}
		matches = matches.length;
		$(this).find('[dir=' + oppositeDirection + ']').each(function() {
			var childMatches = $(this).text().match(quail.textDirection[currentDirection]);
			if(childMatches) {
				matches = matches - childMatches.length;
			}
		});
		if(matches > 0) {
			quail.testFails('languageDirAttributeIsUsed', $(this));
		}
	});
};