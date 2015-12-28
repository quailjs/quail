var Case = require('Case');
const DOM = require('DOM');
var ImgAltIsDifferent = {
  run: function (test) {
    DOM.scry('img:not([src])', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element,
        status: 'inapplicable'
      });
      test.add(_case);
    });
    DOM.scry('img[alt][src]', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if ($(element).attr('src') === $(element).attr('alt') || $(element).attr('src').split('/').pop() === $(element).attr('alt')) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        _case.set({
          status: 'passed'
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Image \"alt\" attributes should not be the same as the filename',
      nl: '\"Alt\"-attributen van afbeeldingen moeten niet hetzelfde zijn als de bestandsnaam'
    },
    description: {
      en: 'All <code>img</code> elements should have an \"alt\" attribute that is not just the name of the file',
      nl: 'Alle <code>img</code>-elementen moeten een \"alt\"-attribuut hebben dat anders is dan de bestandsnaam van de afbeelding.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'H37'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgAltIsDifferent;
