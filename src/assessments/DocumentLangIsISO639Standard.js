var Case = require('Case');
const DOM = require('DOM');
var LanguageCodesStringsComponent = require('LanguageCodesStringsComponent');
var DocumentLangIsISO639Standard = {
  run: function (test) {
    var $element = (test.get('scope').is('html')) ?
      test.get('scope') :
      DOM.scry('html', test.get('scope')).first();

    var _case = Case({
      element: $element[0]
    });

    var langAttr = $element.attr('lang');
    var matchedLang = false; // Check to see if a languagecode was matched

    test.add(_case);
    if (!$element.is('html') || typeof langAttr === 'undefined') {
      _case.set({
        status: 'inapplicable'
      });
    }
    else {
      // Loop over all language codes, checking if the current lang attribute starts
      // with a value that's in the languageCodes array
      LanguageCodesStringsComponent.forEach(function (currentLangCode, i) {
        if (!matchedLang && langAttr.indexOf(currentLangCode) === 0) {
          matchedLang = true;
        }
      });

      if (!matchedLang) {
        _case.set({status: 'failed'});

      }
      else if (langAttr.match(/^[a-z]{2}(-[A-Z]{2})?$/) === null) {
        _case.set({status: 'failed'});

      }
      else {
        _case.set({status: 'passed'});
      }
    }

  },

  meta: {
    testability: 1,
    title: {
      en: 'The document\'s language attribute should be a standard code',
      nl: 'Het language-attribuut van het document moet een standaard code zijn'
    },
    description: {
      en: 'The document should have a default langauge, and that language should use the valid 2 or 3 letter language code according to ISO specification 639.',
      nl: 'Het document moet een standaardtaal hebben en die taal moet de geldige 2- of 3-letterige taalcode hebben volgens de ISO-specificatie 639.'
    },
    guidelines: {
      wcag: {
        '3.1.1': {
          techniques: [
            'H57'
          ]
        }
      }
    },
    tags: [
      'document',
      'language'
    ]
  }
};
module.exports = DocumentLangIsISO639Standard;
