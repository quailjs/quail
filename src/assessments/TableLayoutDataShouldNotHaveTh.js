var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableLayoutDataShouldNotHaveTh = {
  run: function (test) {
    test.get('$scope').find('table').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);

      if ($(this).find('th').length !== 0) {
        if (!IsDataTableComponent($(this))) {
          _case.set({
            status: 'failed'
          });
        }
        else {
          _case.set({
            status: 'passed'
          });
        }
      }
      else {
        _case.set({
          status: 'inapplicable'
        });
      }
    });
  },

  meta: {
replace: 'this'
  }
};
module.exports = TableLayoutDataShouldNotHaveTh;
