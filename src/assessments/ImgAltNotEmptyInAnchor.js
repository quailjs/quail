var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ImgAltNotEmptyInAnchor = {
  run: function (test) {
    test.get('$scope').find('a[href]:has(img)').each(function () {
      var $a = $(this);
      var text = $a.text();

      var _case = Case({
        element: this
      });
      test.add(_case);

      // Concat all alt attributes of images to the text of the paragraph
      $a.find('img[alt]').each(function () {
        text += ' ' + $(this).attr('alt');
      });

      if (IsUnreadable(text)) {
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
module.exports = ImgAltNotEmptyInAnchor;
