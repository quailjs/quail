var Case = require('Case');
var ALinksToSoundFilesNeedTranscripts = function (quail, test) {

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

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
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
};
module.exports = ALinksToSoundFilesNeedTranscripts;
