var Case = require('Case');
const DOM = require('DOM');
var IdrefsHasCorrespondingId = {
  run: function (test) {

    function getAttribute ($element) {
      var attribute = [];
      var attributeList = ['headers', 'aria-controls', 'aria-describedby', 'aria-flowto', 'aria-labelledby', 'aria-owns'];

      attributeList.forEach(function (item) {
        var attr = DOM.getAttribute($element, item);

        if (typeof attr !== typeof undefined && attr !== false) {
          attribute = attr;
          return;
        }
      });
      return attribute.split(/\s+/);
    }

    test.get('scope').forEach(function (scope) {
      var testableElements = DOM.scry([
        'td[headers]',
        'th[headers]',
        '[aria-controls]',
        '[aria-describedby]',
        '[aria-flowto]',
        '[aria-labelledby]',
        '[aria-owns]'
      ].join(', '), scope);

      if (testableElements.length === 0) {
        test.add(Case({
          element: scope,
          status: 'inapplicable'
        }));
        return;
      }
      else {
        testableElements.forEach(function (element) {
          var _case = test.add(Case({
            element: element
          }));

          var attributes = getAttribute($(element));
          var status = 'passed';

          attributes.forEach(function (item) {
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
          techniques: [
            'F17'
          ]
        },
        '4.1.1': {
          techniques: [
            'F17'
          ]
        }
      }
    }
  }
};
module.exports = IdrefsHasCorrespondingId;
