'use strict';

var Case = require('Case');
var NewWindowIsOpened = function NewWindowIsOpened(test) {

  var fenestrate = window.open;
  var _case;

  window.open = function (event) {
    test.each(function (index, _case) {
      var href = _case.get('element').href;
      if (href.indexOf(event) > -1) {
        _case.set('status', 'failed');
      }
    });
  };

  test.get('$scope').find('a').each(function () {
    // Save a reference to this clicked tag.
    _case = Case({
      element: this
    });
    test.add(_case);
    $(this).trigger('click');
  });

  window.open = fenestrate;
};
module.exports = NewWindowIsOpened;