var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var TableLayoutHasNoSummary = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('table[summary]', scope).forEach(function (element) {
        var _case = test.add(Case({
          element: element
        }));
        if (!IsDataTableComponent($(element)) && !IsUnreadable($(element).attr('summary'))) {
          _case.set({status: 'failed'});
        }
        else {
          _case.set({status: 'passed'});
        }
      });
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'All tables used for layout have no summary or an empty summary',
      nl: 'Alle tabellen die alleen voor lay-out worden gebruikt hebben geen samenvatting'
    },
    description: {
      en: 'If a table contains no data, and is used simply for layout, then it should not have a \"summary\" attribute.',
      nl: 'Als een tabel geen data bevat en alleen voor lay-out wordt gebruikt, moet hij geen \"summary\"-attribuut krijgen.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'F46'
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
module.exports = TableLayoutHasNoSummary;
