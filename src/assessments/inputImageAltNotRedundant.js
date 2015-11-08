var RedundantStringsComponent = require('RedundantStringsComponent');
var InputImageAltNotRedundant = function (quail, test, Case) {
  test.get('$scope').find('input[type=image][alt]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (RedundantStringsComponent.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
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
};
module.exports = InputImageAltNotRedundant;
