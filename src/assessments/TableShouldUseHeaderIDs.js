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
    replace: 'this'
  }
};
module.exports = TableShouldUseHeaderIDs;
