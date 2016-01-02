var Case = require('Case');
const DOM = require('DOM');
var InputCheckboxRequiresFieldset = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('input[type="checkbox"]', scope).forEach(function (element) {
        var _case = Case({
          element: element
        });
        test.add(_case);
        var fieldset = DOM.parents(element)
          .find((parent) => DOM.is(parent, 'fieldset'))[0];
        if (!fieldset) {
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
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Logical groups of check boxes should be grouped with a fieldset',
      nl: 'Logische groepen van keuzevakjes moeten gegroepeerd zijn in een fieldset'
    },
    description: {
      en: 'Related \"checkbox\" input fields should be grouped together using a <code>fieldset</code>.',
      nl: 'Gerelateerde \"keuzevakjes\"-invoervelden moeten bij elkaar staan in een <code>fieldset</code>.'
    },
    guidelines: {
      wcag: {
        '3.3.2': {
          techniques: [
            'H71'
          ]
        }
      }
    },
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = InputCheckboxRequiresFieldset;
