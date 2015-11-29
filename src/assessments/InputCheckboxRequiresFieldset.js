var Case = require('Case');
var InputCheckboxRequiresFieldset = {
  run: function (test) {
    test.get('$scope').find('input[type="checkbox"]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if (!$(this).parents('fieldset').length) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        _case.set({
          status: 'passed'
        });
      }
    });
  },

  meta: {
replace: 'this'
  }
};
module.exports = InputCheckboxRequiresFieldset;
