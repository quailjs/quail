var Case = require('Case');
const DOM = require('DOM');
var AudioMayBePresent = {
  run: function (test) {
    var audioExtensions = ['mp3', 'm4p', 'ogg', 'oga', 'opus', 'wav', 'wma', 'wv'];

    test.get('scope').forEach(function (scope) {
      var $this = $(this);
      var hasCase = false; // Test if a case has been created

      // Audio is definately an audio, and objects could be too.
      DOM.scry('object, audio', $this).each(function () {
        hasCase = true;
        test.add(Case({
          element: this,
          status: 'cantTell'
        }));
      });

      // Links refering to files with an audio extensions are good indicators too
      DOM.scry('a[href]', $this).each(function () {
        var $this = $(this);
        var extension = $this.attr('href').split('.').pop();
        if ($.inArray(extension, audioExtensions) !== -1) {
          hasCase = true;
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        }
      });

      // if no case was added, return inapplicable
      if (!hasCase) {
        test.add(Case({
          element: this,
          status: 'inapplicable'
        }));
      }
    });

  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Audio or object uses a link that points to a file with a video extension',
      nl: 'Audio of object met een link naar een bestand met een video extensie'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: [

    ],
    tags: [
      'link',
      'audio'
    ]
  }
};
module.exports = AudioMayBePresent;
