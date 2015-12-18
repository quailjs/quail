var Case = require('Case');
var DOM = require('DOM');
var DefinitionListsAreUsed = {
  run: function (test) {
    DOM.scry('dl', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        status: 'inapplicable'
      });
    });
    DOM.scry('p, li', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var $item = $(this);
      DOM.scry('span, strong, em, b, i', this).each(function () {
        if ($(this).text().length < 50 && $item.text().search($(this).text()) === 0) {
          if ($(this).is('span')) {
            if ($(this).css('font-weight') === $item.css('font-weight') &&
                $(this).css('font-style') === $item.css('font-style')) {
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
