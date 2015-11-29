var Case = require('Case');
var ImgAltIsTooLong = {
  run: function (test) {
    test.get('$scope').find('img[alt]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        status: ($(this).attr('alt').length > 100) ? 'failed' : 'passed'
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Image Alt text is too long',
      nl: 'Altteksten voor een afbeelding zijn kort'
    },
    description: {
      en: 'All \"alt\" attributes for <code>img</code> elements should be clear and concise. \"Alt\" attributes over 100 characters long should be reviewed to see if they are too long.',
      nl: 'Alle \"alt\"-attributen voor <code>img</code>-elementen moeten duidelijk en bondig zijn. Verifieer \"alt\"-attributen langer dan 100 tekens en kort ze in waar mogelijk.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'H37'
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
module.exports = ImgAltIsTooLong;
