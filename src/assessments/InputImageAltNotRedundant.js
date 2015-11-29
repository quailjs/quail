var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
var RedundantStringsComponent = require('RedundantStringsComponent');
var InputImageAltNotRedundant = {
  run: function (test) {
    test.get('$scope').find('input[type=image][alt]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if (RedundantStringsComponent.inputImage.indexOf(CleanStringComponent($(this).attr('alt'))) > -1) {
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
module.exports = InputImageAltNotRedundant;
