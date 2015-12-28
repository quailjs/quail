var Case = require('Case');
const DOM = require('DOM');
var ALinksToMultiMediaRequireTranscript = {
  run: function (test) {
    var selector = [
      'a[href$=".wmv"]',
      'a[href$=".mpg"]',
      'a[href$=".mov"]',
      'a[href$=".ram"]',
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
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Any links to a multimedia file should also include a link to a transcript',
      nl: 'Elke link naar een multimediabestand moet ook een link bevatten naar een transcriptie'
    },
    description: {
      en: 'Links to a multimedia file should be followed by a link to a transcript of the file.',
      nl: 'Links naar een multimediabestand moeten worden gevolgd door een link naar de transcriptie van dit bestand.'
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
module.exports = ALinksToMultiMediaRequireTranscript;
