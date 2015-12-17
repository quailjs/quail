var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var DOM = require('DOM');
var InputWithoutLabelHasTitle = {
  run: function (test) {

    test.get('$scope').each(function () {

      var testableElements = DOM.scry('input, select, textarea', this);

      if (testableElements.length === 0) {
        var _case = Case({
          element: this,
          status: 'inapplicable'
        });
        test.add(_case);
        return;
      }
      else {
        testableElements.each(function () {
          var _case = Case({
            element: this
          });
          test.add(_case);

          if ($(this).css('display') === 'none') {
            _case.set({
              status: 'inapplicable'
            });
            return;
          }
          if (!test.get('$scope').find('label[for=' + $(this).attr('id') + ']').length &&
            (!$(this).attr('title') || IsUnreadable($(this).attr('title')))) {
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
