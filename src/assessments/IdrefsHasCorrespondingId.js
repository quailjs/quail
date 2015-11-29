var Case = require('Case');
var IdrefsHasCorrespondingId = {
  run: function (test) {

    function getAttribute ($element) {
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
      var testableElements = $(this).find(
        'td[headers], th[headers], [aria-controls], [aria-describedby], [aria-flowto], ' +
        '[aria-labelledby], [aria-owns]');

      if (testableElements.length === 0) {
        test.add(Case({
          element: this,
          status: 'inapplicable'
        }));
        return;
      }
      else {
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
  },

  meta: {
    testability: 1,
    title: {
      en: 'Elements with an idref attribute must correspond to an element with an ID',
      nl: 'Elementen met een idref-attribuut moeten corresponderen met een element met een ID'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques:  [
            'F17'
          ]
        },
        '4.1.1': {
          techniques:  [
            'F17'
          ]
        }
      }
    }
  }
};
module.exports = IdrefsHasCorrespondingId;
