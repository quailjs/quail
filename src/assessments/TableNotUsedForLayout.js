var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableNotUsedForLayout = {
  run: function (test) {
    test.get('$scope').find('table').each(function () {
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
    replace: 'this'
  }
};
module.exports = TableNotUsedForLayout;
