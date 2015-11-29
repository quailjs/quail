var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var AppletContainsTextEquivalent = {
  run: function (test) {
    test.get('$scope').find('applet[alt=""], applet:not(applet[alt])').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if (IsUnreadable($(this).text())) {
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
module.exports = AppletContainsTextEquivalent;
