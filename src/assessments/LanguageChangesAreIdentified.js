var GetTextContentsComponent = require('GetTextContentsComponent');
var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
const DOM = require('DOM');
var LanguageComponent = require('LanguageComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var guessLanguage = require('guessLanguage/lib/guessLanguage');
var LanguageChangesAreIdentified = {
  run: function (test) {
    var noCharactersMatch = function ($element, language, matches, regularExpression) {
      var $children = DOM.scry('[lang=' + language + ']', $element);
      var childMatches;
      if ($children.length === 0) {
        return true;
      }
      matches = matches.length;
      $children.forEach(function (element) {
        childMatches = GetTextContentsComponent(element).match(regularExpression);
        if (childMatches) {
          matches -= childMatches.length;
        }
      });
      return matches > 0;
    };

    var findCurrentLanguage = function ($element, scope) {
      if (DOM.hasAttribute($element, 'lang')) {
        return DOM.getAttribute($element, 'lang').trim().toLowerCase().split('-')[0];
      }
      var langScope = DOM.parents($element).find((parent) => {
        return DOM.hasAttribute(parent, 'lang');
      })[0];
      if (langScope) {
        return DOM.getAttribute(langScope, 'lang').trim().toLowerCase().split('-')[0];
      }
      return LanguageComponent.getDocumentLanguage(scope, true);
    };

    test.get('scope').forEach((scope) => {
      let currentLanguage = LanguageComponent.getDocumentLanguage(scope, true);
      let text, matches, $element, failed;

      DOM.scry(TextSelectorComponent, scope)
        .filter(function (element) {
          return TextNodeFilterComponent(element);
        })
        .forEach(function (element) {
          var self = element;
          $element = element;
          currentLanguage = findCurrentLanguage($element, scope);
          text = GetTextContentsComponent($element);
          failed = false;

          var singletons = LanguageComponent.scriptSingletons;
          for (var code in singletons) {
            if (singletons.hasOwnProperty(code)) {
              var regularExpression = singletons[code];
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
            }
          }
          var scripts = LanguageComponent.scripts;
          for (var name in scripts) {
            if (scripts.hasOwnProperty(name)) {
              var script = scripts[name];
            }
            if (script.languageindexOf(currentLanguage) !== -1) {
              return;
            }
            matches = text.match(script.regularExpression);
            if (matches && matches.length && noCharactersMatch($element, name, matches, regularExpression)) {
              test.add(Case({
                element: self,
                info: {
                  language: name
                },
                status: 'failed'
              }));
              failed = true;
            }
          }
          if (typeof guessLanguage !== 'undefined' && !DOM.scry('[lang]', $element).length && DOM.text($element).trim().length > 400) {
            guessLanguage.info(DOM.text($element), function (info) {
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
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Use language attributes to indicate changes in language',
      nl: 'Gebruik het taal-attribuut om aan te geven dat de taal verandert'
    },
    description: {
      en: 'When the language of the document changes, make sure to wrap those changes in an element with the <code>lang</code> attribute.',
      nl: 'Als de taal van het document verandert, zet deze veranderingen dan in een element met het <code>lang</code>-attribuut.'
    },
    guidelines: {
      wcag: {
        '3.1.2': {
          techniques: [
            'H58'
          ]
        }
      }
    },
    tags: [
      'language',
      'content'
    ]
  }
};
module.exports = LanguageChangesAreIdentified;
