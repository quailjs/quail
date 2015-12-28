var Case = require('Case');
const DOM = require('DOM');
var AMultimediaTextAlternative = {
  run: function (test) {

    var selector = [
      'a[href$=".aif"]',
      'a[href$=".iff"]',
      'a[href$=".mov"]',
      'a[href$=".mp3"]',
      'a[href$=".mpg"]',
      'a[href$=".ram"]',
      'a[href$=".sam"]',
      'a[href$=".smp"]',
      'a[href$=".snd"]',
      'a[href$=".svx"]',
      'a[href$=".pcm"]',
      'a[href$=".vce"]',
      'a[href$=".vox"]',
      'a[href$=".wav"]',
      'a[href$=".wmv"]'
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
    guidelines: [

    ],
    tags: [
      'link',
      'media',
      'content'
    ]
  }
};
module.exports = AMultimediaTextAlternative;
