var Case = require('Case');
var LabelsAreAssignedToAnInput = function (test) {
  test.get('$scope').find('label').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (!$(this).attr('for')) {
      _case.set({
        status: 'failed'
      });
    }
    else {
      if (!test.get('$scope').find('#' + $(this).attr('for')).length ||
         !test.get('$scope').find('#' + $(this).attr('for')).is(':input')) {
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
  });
};
module.exports = LabelsAreAssignedToAnInput;
