var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ImgNonDecorativeHasAlt = {
  run: function (test) {
    DOM.scry('img[alt]', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if (IsUnreadable($(this).attr('alt')) &&
          ($(this).width() > 100 || $(this).height() > 100)) {
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
    testability: 0.5,
    title: {
      en: 'Any non-decorative images should have a non-empty \"alt\" attribute',
      nl: 'Elke niet-decoratieve afbeelding moet een gevuld \"alt\"-attribuut hebben'
    },
    description: {
      en: 'Any image that is not used decoratively or which is purely for layout purposes cannot have an empty \"alt\" attribute.',
      nl: 'Elke afbeelding die niet ter decoratie is of voor lay-out doeleinden wordt gebruikt, moet een gevuld \"alt\"-attribuut hebben.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'F38'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgNonDecorativeHasAlt;
