var ContainsReadableTextComponent = require('ContainsReadableTextComponent');
var Case = require('Case');
const DOM = require('DOM');
var AMustContainText = {
  run: function (test) {
    DOM.scry('a', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);

      if (!$(element).attr('href') ||
        DOM.getStyle(element, 'display') === 'none') {
        _case.set({
          status: 'inapplicable'
        });
        return;
      }

      if (ContainsReadableTextComponent($(element), true)) {
        _case.set({
          status: 'passed'
        });
      }
      else {
        _case.set({
          status: 'failed'
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Links should contain text',
      nl: 'Links moeten tekst bevatten'
    },
    description: {
      en: 'Because many users of screen-readers use links to navigate the page, providing links with no text (or with images that have empty \"alt\" attributes and no other readable text) hinders these users.',
      nl: 'Veel gebruikers van schermlezers gebruiken links om op de pagina te navigeren. Links zonder tekst (of met afbeeldingen die een leeg \"alt\"-attribuut hebben en geen andere leesbare tekst) hinderen deze gebruikers.'
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
        },
        '4.1.2': {
          techniques: [
            'H91'
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
module.exports = AMustContainText;
