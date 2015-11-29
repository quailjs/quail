var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableShouldUseHeaderIDs = {
  run: function (test) {
    test.get('$scope').find('table').each(function () {
      var $table = $(this);
      var tableFailed = false;
      if (IsDataTableComponent($table)) {
        $table.find('th').each(function () {
          if (!tableFailed && !$(this).attr('id')) {
            tableFailed = true;
            test.add(Case({
              element: $table.get(0),
              status: 'failed'
            }));
          }
        });
        if (!tableFailed) {
          $table.find('td[header]').each(function () {
            if (!tableFailed) {
              $.each($(this).attr('header').split(' '), function (index, id) {
                if (!$table.find('#' + id).length) {
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
          techniques:  [
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
