quail.whiteSpaceInWord = function() {
	var whitespaceGroup, nonWhitespace;
	quail.html.find(quail.textSelector).each(function() {
		nonWhitespace = ($(this).text()) ? $(this).text().match(/[^\s\\]/g) : false;
		whitespaceGroup = ($(this).text()) ? $(this).text().match(/[^\s\\]\s[^\s\\]/g) : false;
		if(nonWhitespace &&
		    whitespaceGroup &&
			whitespaceGroup.length > 3 &&
			whitespaceGroup.length >= (nonWhitespace.length / 2) - 2) {
		  quail.testFails('whiteSpaceInWord', $(this));
		}
	});
};

