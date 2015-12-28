var Case = require('Case');
const DOM = require('DOM');
var NewWindowIsOpened = {
  run: function (test) {

    var fenestrate = window.open;
    var _case;

    window.open = function (event) {
      test.forEach(function (_case) {
        var href = _case.get('element').href;
        if (href.indexOf(event) > -1) {
          _case.set('status', 'failed');
        }
      });
    };

    DOM.scry('a', test.get('scope')).forEach(function (element) {
      // Save a reference to this clicked tag.
      _case = Case({
        element: element
      });
      test.add(_case);
      $(element).trigger('click');
    });

    window.open = fenestrate;
  },

  meta: {
    testability: 1,
    title: {
      en: 'A link should not open a new window',
      nl: 'Een link opent geen nieuw scherm'
    },
    description: {
      en: 'Avoid confusion that may be caused by the appearance of new windows that were not requested by the user.',
      nl: 'Voorkom verwarring die veroorzaakt wordt door het openen van nieuwe schermen die de gebruiker niet verwacht.'
    },
    guidelines: {
      wcag: {
        '2.0.0': {
          techniques: [
            'H83'
          ]
        }
      }
    },
    tags: [
      'javascript',
      'html'
    ]
  }
};
module.exports = NewWindowIsOpened;
