var Case = require('Case');
var ImgAltIsDifferent = {
  run: function (test) {
    test.get('$scope').find('img:not([src])').each(function () {
      var _case = Case({
        element: this,
        status: 'inapplicable'
      });
      test.add(_case);
    });
    test.get('$scope').find('img[alt][src]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if ($(this).attr('src') === $(this).attr('alt') || $(this).attr('src').split('/').pop() === $(this).attr('alt')) {
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
module.exports = ImgAltIsDifferent;
