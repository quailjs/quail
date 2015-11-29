var Case = require('Case');
var TabularDataIsInTable = {
  run: function (test) {
    test.get('$scope').find('pre').each(function () {
      if ($(this).html().search('\t') >= 0) {
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
module.exports = TabularDataIsInTable;
