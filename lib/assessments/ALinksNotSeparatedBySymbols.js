'use strict';

var Case = require('Case');
var SymbolsStringsComponent = require('SymbolsStringsComponent');
var ALinksNotSeparatedBySymbols = function ALinksNotSeparatedBySymbols(test) {
  test.get('$scope').find('a').each(function () {
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
};
module.exports = ALinksNotSeparatedBySymbols;