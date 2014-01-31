quail.languageChangesAreIdentified = function() {
	var currentLanguage = quail.components.language.getDocumentLanguage(true);
	var text, regularExpression, matches, $element;

	var noCharactersMatch = function($element, language, matches, regularExpression) {
		var $children = $element.find('[lang=' + language + ']');
		var childMatches;
		if($children.length === 0) {
			return true;
		}
		matches = matches.length;
		$children.each(function() {
			childMatches = quail.getTextContents($(this)).match(regularExpression);
			if(childMatches) {
				matches -= childMatches.length;
			}
		});
		return matches > 0;
	};

	quail.html.find(quail.textSelector).each(function() {
		$element = $(this);
		if($element.attr('lang')) {
			currentLanguage = $element.attr('lang').trim().toLowerCase().split('-')[0];
		}
		text = quail.getTextContents($element);
		
		$.each(quail.components.language.scriptSingletons, function(code, regularExpression) {
			if(code === currentLanguage) {
				return;
			}
			matches = text.match(regularExpression);
			if(matches && matches.length && noCharactersMatch($element, code, matches, regularExpression)) {
				quail.testFails('languageChangesAreIdentified', $element, { language : code });
			}
		});
		$.each(quail.components.language.scripts, function(code, script) {
			if(script.languages.indexOf(currentLanguage) !== -1) {
				return;
			}
			matches = text.match(script.regularExpression);
			if(matches && matches.length && noCharactersMatch($element, code, matches, regularExpression)) {
				quail.testFails('languageChangesAreIdentified', $element, { language : code });
			}
		});

	});
};