quail.aLinksToSoundFilesNeedTranscripts = function (quail, test, Case) {

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
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    }
    else {
      // cantTell.
      candidates.each(function () {
        test.add(quail.lib.Case({
          element: this,
          status: 'cantTell'
        }));
      });
    }
  });
};
