var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
const DOM = require('DOM');
var SuspiciousLinksStringsComponent = require('SuspiciousLinksStringsComponent');
var ASuspiciousLinkText = {
  run: function (test) {
    DOM.scry('a', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (!DOM.getAttribute(element, 'href')) {
        _case.set({
          status: 'inapplicable'
        });
        return;
      }
      var text = $(element).text();
      DOM.scry('img[alt]', element).forEach(function (element) {
        text = text + DOM.getAttribute(element, 'alt');
      });
      if (SuspiciousLinksStringsComponent.indexOf(CleanStringComponent(text)) > -1) {
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
    testability: 1,
    title: {
      en: 'Link text should be useful',
      nl: 'Linkteksten moeten bruikbaar en betekenisvol zijn'
    },
    description: {
      en: 'Because many users of screen-readers use links to navigate the page, providing links with text that simply read \"click here\" gives no hint of the function of the link.',
      nl: 'Veel gebruikers van schermlezers gebruiken links om op de pagina te navigeren. Links met de tekst \"klik hier\" zijn voor deze gebruikers niet betekenisvol en niet bruikbaar.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'H30'
          ]
        },
        '2.4.4': {
          techniques: [
            'H30'
          ]
        },
        '2.4.9': {
          techniques: [
            'H30'
          ]
        }
      }
    },
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = ASuspiciousLinkText;
