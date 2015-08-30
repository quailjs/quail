/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

quail.areaLinksToSoundFile = function (quail, test, Case, options) {

  var selector = ['area[href$="wav"]', 'area[href$="snd"]', 'area[href$="mp3"]', 'area[href$="iff"]', 'area[href$="svx"]', 'area[href$="sam"]', 'area[href$="smp"]', 'area[href$="vce"]', 'area[href$="vox"]', 'area[href$="pcm"]', 'area[href$="aif"]'].join(', ');

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    } else {
      candidates.each(function () {
        var status;

        // If a test is defined, then use it
        if (options.test && !$(this).is(options.test)) {
          status = 'passed';
        } else {
          status = 'failed';
        }

        test.add(quail.lib.Case({
          element: this,
          status: status
        }));
      });
    }
  });
};