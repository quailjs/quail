'use strict';

quail.videosEmbeddedOrLinkedNeedCaptions = function (quail, test, Case) {

  quail.components.video.findVideos(test.get('$scope'), function (element, pass) {
    if (!pass) {
      test.add(Case({
        element: element[0],
        status: 'failed'
      }));
    } else {
      test.add(Case({
        element: element[0],
        status: 'passed'
      }));
    }
  });
};