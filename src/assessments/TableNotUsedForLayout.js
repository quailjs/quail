var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableNotUsedForLayout = {
  run: function (test) {
    DOM.scry('table', test.get('scope')).each(function () {
      if (!IsDataTableComponent($(this))) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
      else {
        test.add(Case({
          element: this,
          status: 'passed'
        }));
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Tables should not be used for layout',
      nl: 'Tabellen moet niet worden gebruikt voor lay-out'
    },
    description: {
      en: 'Tables are for data, not for creating a page layout. Consider using standard HTML and CSS techniques instead.',
      nl: 'Tabellen zijn voor data, niet om een pagina op te maken. Gebruik hiervoor HTML en CSS.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
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
module.exports = TableNotUsedForLayout;
