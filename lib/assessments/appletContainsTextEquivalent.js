'use strict';

var AppletContainsTextEquivalent = function AppletContainsTextEquivalent(quail, test, Case) {
  test.get('$scope').find('applet[alt=""], applet:not(applet[alt])').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    if (quail.isUnreadable($(this).text())) {
      _case.set({
        status: 'failed'
      });
    } else {
      _case.set({
        status: 'passed'
      });
    }
  });
};;
module.exports = AppletContainsTextEquivalent;