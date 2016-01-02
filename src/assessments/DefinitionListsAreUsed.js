var Case = require('Case');
const DOM = require('DOM');
var DefinitionListsAreUsed = {
  run: function (test) {
    DOM.scry('dl', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      _case.set({
        status: 'inapplicable'
      });
    });
    DOM.scry('p, li', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      var $item = element;
      DOM.scry('span, strong, em, b, i', element).forEach(function (element) {
        if (DOM.text(element).length < 50 && DOM.text($item).search(DOM.text(element)) === 0) {
          if (DOM.is(element, 'span')) {
            if (DOM.getComputedStyle(element, 'font-weight') === DOM.getComputedStyle($item, 'font-weight') &&
                DOM.getComputedStyle(element, 'font-style') === DOM.getComputedStyle($item, 'font-style')) {
              _case.set({
                status: 'passed'
              });
              return;
            }
          }
          _case.set({
            status: 'failed'
          });
        }
      });
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Use a definition list for defining terms',
      nl: 'Gebruik een definition list voor definities'
    },
    description: {
      en: 'When providing a list of terms or definitions, use a definition list.',
      nl: 'Wanneer er gebruik wordt gemaakt van een lijst termen of definities, gebruik hiervoor dan een definition list.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H48'
          ]
        }
      }
    },
    tags: [
      'structure'
    ]
  }
};
module.exports = DefinitionListsAreUsed;
