/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var AreaLinksToSoundFile = {
  run: function (test, options) {

    options = options || {};

    var selector = [
      'area[href$="wav"]',
      'area[href$="snd"]',
      'area[href$="mp3"]',
      'area[href$="iff"]',
      'area[href$="svx"]',
      'area[href$="sam"]',
      'area[href$="smp"]',
      'area[href$="vce"]',
      'area[href$="vox"]',
      'area[href$="pcm"]',
      'area[href$="aif"]'
    ].join(', ');

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(this).is(options.test)) {
            status = 'passed';
          }
          else {
            status = 'failed';
          }

          test.add(Case({
            element: this,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"area\" elements which link to a sound file should also provide a link to a transcript',
      nl: 'Alle \"area\"-elementen met een link naar een geluidsbestand moeten ook een link bevatten naar een transcriptie'
    },
    description: {
      en: 'All <code>area</code> elements which link to a sound file should have a text transcript.',
      nl: 'Alle \"area\"-elementen met een link naar een geluidsbestand moeten een transcriptie hebben in tekst.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'G74'
          ]
        }
      }
    },
    tags: [
      'imagemap',
      'media',
      'content'
    ]
  }
};
module.exports = AreaLinksToSoundFile;
