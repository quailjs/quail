'use strict';

quail.aMultimediaTextAlternative = function (quail, test, Case) {

  var selector = ['a[href$=".aif"]', 'a[href$=".iff"]', 'a[href$=".mov"]', 'a[href$=".mp3"]', 'a[href$=".mpg"]', 'a[href$=".ram"]', 'a[href$=".sam"]', 'a[href$=".smp"]', 'a[href$=".snd"]', 'a[href$=".svx"]', 'a[href$=".pcm"]', 'a[href$=".vce"]', 'a[href$=".vox"]', 'a[href$=".wav"]', 'a[href$=".wmv"]'].join(', ');

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    // Inapplicable.
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
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