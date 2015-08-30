quail.languageChangesAreIdentified = function (quail, test, Case) {
  var $scope = test.get('$scope');
  var currentLanguage = quail.components.language.getDocumentLanguage($scope, true);
  var text, regularExpression, matches, $element, failed;

  var noCharactersMatch = function ($element, language, matches, regularExpression) {
    var $children = $element.find('[lang=' + language + ']');
    var childMatches;
    if ($children.length === 0) {
      return true;
    }
    matches = matches.length;
    $children.each(function () {
      childMatches = quail.getTextContents($(this)).match(regularExpression);
      if (childMatches) {
        matches -= childMatches.length;
      }
    });
    return matches > 0;
  };

  var findCurrentLanguage = function ($element) {
    if ($element.attr('lang')) {
      return $element.attr('lang').trim().toLowerCase().split('-')[0];
    }
    if ($element.parents('[lang]').length) {
      return $element.parents('[lang]:first').attr('lang').trim().toLowerCase().split('-')[0];
    }
    return quail.components.language.getDocumentLanguage($scope, true);
  };

  $scope
    .find(quail.textSelector)
    .filter(function (index, element) {
      return quail.components.textNodeFilter(element);
    })
    .each(function () {
      var self = this;
      $element = $(this);
      currentLanguage = findCurrentLanguage($element);
      text = quail.getTextContents($element);
      failed = false;

      $.each(quail.components.language.scriptSingletons, function (code, regularExpression) {
        if (code === currentLanguage) {
          return;
        }
        matches = text.match(regularExpression);
        if (matches && matches.length && noCharactersMatch($element, code, matches, regularExpression)) {
          test.add(Case({
            element: self,
            info: {
              language: code
            },
            status: 'failed'
          }));
          failed = true;
        }
      });
      $.each(quail.components.language.scripts, function (code, script) {
        if (script.languages.indexOf(currentLanguage) !== -1) {
          return;
        }
        matches = text.match(script.regularExpression);
        if (matches && matches.length && noCharactersMatch($element, code, matches, regularExpression)) {
          test.add(Case({
            element: self,
            info: {
              language: code
            },
            status: 'failed'
          }));
          failed = true;
        }
      });
      if (typeof guessLanguage !== 'undefined' && !$element.find('[lang]').length && $element.text().trim().length > 400) {
        guessLanguage.info($element.text(), function (info) {
          if (info[0] !== currentLanguage) {
            test.add(Case({
              element: self,
              info: {
                language: info[0]
              },
              status: 'failed'
            }));
            failed = true;
          }
        });
      }
      // Passes.
      if (!failed) {
        test.add(Case({
          element: self,
          status: 'passed'
        }));
      }
    });
};
