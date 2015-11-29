var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableLayoutMakesSenseLinearized = {
  run: function (test) {
    test.get('$scope').find('table').each(function () {
      if (!IsDataTableComponent($(this))) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = TableLayoutMakesSenseLinearized;
