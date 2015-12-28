var Case = require('Case');
const DOM = require('DOM');
var InputImageAltIsNotFileName = {
  run: function (test) {
    DOM.scry('input[type=image][alt]', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if ($(element).attr('src') === $(element).attr('alt')) {
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
      en: 'All \"input\" elements with a type of \"image\" must have an \"alt\" attribute which is not the same as the filename',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben dat anders is dan de bestandsnaam'
    },
    description: {
      en: 'All <code>input</code> elements with a type of \"image\" should have an \"alt\" attribute which is not the same as the filename.',
      nl: 'Elk \"invoer\"-element met een type \"afbeelding\" moet een \"alt\"-attribuut hebben dat anders is dan de bestandsnaam.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
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
module.exports = InputImageAltIsNotFileName;
