var Case = require('Case');
const DOM = require('DOM');
var ALinksToSoundFilesNeedTranscripts = {
  run: function (test) {

    var selector = [
      'a[href$=".wav"]',
      'a[href$=".snd"]',
      'a[href$=".mp3"]',
      'a[href$=".iff"]',
      'a[href$=".svx"]',
      'a[href$=".sam"]',
      'a[href$=".smp"]',
      'a[href$=".vce"]',
      'a[href$=".vox"]',
      'a[href$=".pcm"]',
      'a[href$=".aif"]'
    ].join(', ');

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      // Inapplicable.
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        // cantTell.
        candidates.forEach(function (element) {
          test.add(Case({
            element: element,
            status: 'cantTell'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Any links to a sound file should also include a link to a transcript',
      nl: 'Elke link naar een geluidsbestand moet ook een link bevatten naar een transcriptie'
    },
    description: {
      en: 'Links to a sound file should be followed by a link to a transcript of the file.',
      nl: 'Links naar een geluidsbestand moeten worden gevolgd door een link naar de transcriptie van dit bestand.'
    },
    guidelines: {
      508: [
        'c'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'G74'
          ]
        }
      }
    },
    tags: [
      'link',
      'media',
      'content'
    ]
  }
};
module.exports = ALinksToSoundFilesNeedTranscripts;
