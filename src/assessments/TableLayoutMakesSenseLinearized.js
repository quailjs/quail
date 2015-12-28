var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
const DOM = require('DOM');
var TableLayoutMakesSenseLinearized = {
  run: function (test) {
    DOM.scry('table', test.get('scope')).forEach(function (element) {
      if (!IsDataTableComponent($(element))) {
        test.add(Case({
          element: element,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'All tables used for layout should make sense when removed',
      nl: 'Als tabellen voor lay-out worden gebruikt moet de pagina nog duidelijk blijven als de tabel wordt verwijderd'
    },
    description: {
      en: 'If a <code>table</code> element is used for layout purposes only, then the content of the table should make sense if the table is linearized.',
      nl: 'Als een <code>table</code>-element alleen voor lay-out-doeleinden wordt gebruikt, moet de inhoud van de tabel nog steeds duidelijk zijn als de tabel wordt verwijderd.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'G57'
          ]
        },
        '4.1.1': {
          techniques: [
            'F49'
          ]
        }
      }
    },
    tags: [
      'table',
      'layout',
      'content'
    ]
  }
};
module.exports = TableLayoutMakesSenseLinearized;
