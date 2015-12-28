var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var InputWithoutLabelHasTitle = {
  run: function (test) {

    test.get('scope').forEach(function (scope) {

      var testableElements = DOM.scry('input, select, textarea', scope);

      if (testableElements.length === 0) {
        var _case = Case({
          element: scope,
          status: 'inapplicable'
        });
        test.add(_case);
        return;
      }
      else {
        testableElements.forEach(function (element) {
          var _case = Case({
            element: element
          });
          test.add(_case);

          if ($(element).css('display') === 'none') {
            _case.set({
              status: 'inapplicable'
            });
            return;
          }
          if (!DOM.scry('label[for=' + $(element).attr('id') + ']', test.get('scope')).length &&
            (!$(element).attr('title') || IsUnreadable($(element).attr('title')))) {
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
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Form controls without label should have a title attribute',
      nl: 'Formulierelementen zonder label moeten een titelattribuut hebben'
    },
    description: {
      en: 'If it is not possible to have a label for a form control, then a title attribute on the element should be provided that describes the purpose of the control.',
      nl: 'Als een formulierelement geen label kan krijgen, dan moet een dat element een titelattribuut krijgen dat het doel van het element beschrijft.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'H65'
          ]
        },
        '1.3.1': {
          techniques: [
            'H65'
          ]
        },
        '3.3.2': {
          techniques: [
            'H65'
          ]
        },
        '4.1.2': {
          techniques: [
            'H65'
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
module.exports = InputWithoutLabelHasTitle;
