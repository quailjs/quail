var Case = require('Case');
var InputImageAltIsShort = {
  run: function (test) {
    test.get('$scope').find('input[type=image]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if ($(this).attr('alt').length > 100) {
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
    testability: 1,
    title: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute which is as short as possible',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben dat zo kort mogelijk is'
    },
    description: {
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute which is as short as possible.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben dat zo kort mogelijk is.'
    },
    guidelines: {
      508:  [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques:  [
            'H36'
          ]
        }
      }
    },
    tags: [
      'form',
      'image',
      'content'
    ]
  }
};
module.exports = InputImageAltIsShort;
