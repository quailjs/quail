var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var AppletContainsTextEquivalent = {
  run: function (test) {
    DOM.scry('applet[alt=""], applet:not(applet[alt])', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (IsUnreadable(DOM.text(element))) {
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
      en: 'All applets should contain the same content within the body of the applet',
      nl: 'Alle applets moeten dezelfde content bevatten in de body van de applet'
    },
    description: {
      en: 'Applets should contain their text equivalents or description within the <code>applet</code> tag itself.',
      nl: 'Applets moeten hun tekstuele equivalent of beschrijving bevatten in de <code>applet</code> tag.'
    },
    guidelines: {
      508: [
        'm'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'G74',
            'H35'
          ]
        }
      }
    },
    tags: [
      'objects',
      'applet',
      'content'
    ]
  }
};
module.exports = AppletContainsTextEquivalent;
