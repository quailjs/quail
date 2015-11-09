'use strict';

var Case = require('Case');
var IdrefsHasCorrespondingId = function IdrefsHasCorrespondingId(quail, test) {

  function getAttribute($element) {
    var attribute = [];
    var attributeList = ['headers', 'aria-controls', 'aria-describedby', 'aria-flowto', 'aria-labelledby', 'aria-owns'];

    $.each(attributeList, function (index, item) {

      var attr = $element.attr(item);

      if (typeof attr !== typeof undefined && attr !== false) {
        attribute = attr;
        return;
      }
    });
    return attribute.split(/\s+/);
  }

  test.get('$scope').each(function () {
    var testableElements = $(this).find('td[headers], th[headers], [aria-controls], [aria-describedby], [aria-flowto], ' + '[aria-labelledby], [aria-owns]');

    if (testableElements.length === 0) {
      test.add(Case({
        element: this,
        status: 'inapplicable'
      }));
      return;
    } else {
      testableElements.each(function () {
        var _case = test.add(Case({
          element: this
        }));

        var attributes = getAttribute($(this));
        var status = 'passed';

        $.each(attributes, function (index, item) {
          if (item !== '' && $('#' + item).length === 0) {
            status = 'failed';
            return;
          }
        });

        _case.set({
          status: status
        });
      });
    }
  });
};
module.exports = IdrefsHasCorrespondingId;