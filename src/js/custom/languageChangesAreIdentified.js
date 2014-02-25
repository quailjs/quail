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

	var findCurrentLanguage = function($element) {
		if($element.attr('lang')) {
			return $element.attr('lang').trim().toLowerCase().split('-')[0];
		}
		if($element.parents('[lang]').length) {
			return $element.parents('[lang]:first').attr('lang').trim().toLowerCase().split('-')[0];
		}
		return quail.components.language.getDocumentLanguage(true);
	};

	quail.html.find(quail.textSelector).each(function() {
		$element = $(this);
		currentLanguage = findCurrentLanguage($element);
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
		if(typeof guessLanguage !== 'undefined' && !$element.find('[lang]').length && $element.text().trim().length > 400) {
			guessLanguage.info($element.text(), function(info) {
				if(info[0] !== currentLanguage) {
					quail.testFails('languageChangesAreIdentified', $element, { language : info[0] });
				}
			});
		}
	});
};