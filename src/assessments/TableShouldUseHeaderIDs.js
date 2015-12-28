var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
const DOM = require('DOM');
var TableShouldUseHeaderIDs = {
  run: function (test) {
    DOM.scry('table', test.get('scope')).forEach(function (element) {
      var $table = $(element);
      var tableFailed = false;
      if (IsDataTableComponent($table)) {
        DOM.scry('th', $table).forEach(function (element) {
          if (!tableFailed && !$(element).attr('id')) {
            tableFailed = true;
            test.add(Case({
              element: $table.get(0),
              status: 'failed'
            }));
          }
        });
        if (!tableFailed) {
          DOM.scry('td[header]', $table).forEach(function (element) {
            if (!tableFailed) {
              $(element).attr('header').split(' ').forEach(function (id) {
                if (!DOM.scry('#' + id, $table).length) {
                  tableFailed = true;
                  test.add(Case({
                    element: $table.get(0),
                    status: 'failed'
                  }));
                }
              });
            }
          });
        }
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Table cells use IDs to identify headers',
      nl: 'Tabelcellen gebruiken IDs om koppen te identificeren'
    },
    description: {
      en: 'If a table is not being used for layout, it should use IDs and header attributes to identify table headers.',
      nl: 'Een tabel moet IDs en header-attributen gebruiken om tabelkoppen te identificeren.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H43'
          ]
        }
      }
    },
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableShouldUseHeaderIDs;
