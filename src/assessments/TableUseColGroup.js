var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var TableUseColGroup = {
  run: function (test) {
    test.get('$scope').find('table').each(function () {
      if (IsDataTableComponent($(this)) && !$(this).find('colgroup').length) {
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
module.exports = TableUseColGroup;
