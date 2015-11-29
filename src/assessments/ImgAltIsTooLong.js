var Case = require('Case');
var ImgAltIsTooLong = {
  run: function (test) {
    test.get('$scope').find('img[alt]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        status: ($(this).attr('alt').length > 100) ? 'failed' : 'passed'
      });
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = ImgAltIsTooLong;
