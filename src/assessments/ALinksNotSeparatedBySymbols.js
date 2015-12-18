var Case = require('Case');
const DOM = require('DOM');
var SymbolsStringsComponent = require('SymbolsStringsComponent');
var ALinksNotSeparatedBySymbols = {
  run: function (test) {
    DOM.scry('a', test.get('scope')).each(function () {
      var $link = $(this);
      if ($link.next('a').length) {
        var text = $link.get(0).nextSibling.wholeText;
        // The string between the links is composed of symbols.
        if (typeof text === 'string' && SymbolsStringsComponent.indexOf(text.toLowerCase().trim()) !== -1) {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        }
        // The string between the links is composed of words.
        else {
          test.add(Case({
            element: this,
            status: 'passed'
          }));
        }
      }
      // If nothing follows the link, then there is nothing to test.
      else {
        test.add(Case({
          element: this,
          status: 'inapplicable'
        }));
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Links should not be separated by symbols alone',
      nl: 'Links mogen niet alleen door symbolen gescheidn worden'
    },
    description: {
      en: 'Since symbols are either not read, or can be confusing when using a screen reader, do not separate links with un-readable symbols.',
      nl: 'Symbolen worden niet voorgelezen of zijn verwarrend bij het gebruik van een schermlezer. Gebruik geen onleesbare symbolen om links van elkaar te scheiden.'
    },
    guidelines: [

    ],
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = ALinksNotSeparatedBySymbols;
