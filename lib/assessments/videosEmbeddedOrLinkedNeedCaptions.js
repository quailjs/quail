'use strict';

var VideoComponent = require('VideoComponent');
var VideosEmbeddedOrLinkedNeedCaptions = function VideosEmbeddedOrLinkedNeedCaptions(quail, test, Case) {

  VideoComponent.findVideos(test.get('$scope'), function (element, pass) {
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
};;
module.exports = VideosEmbeddedOrLinkedNeedCaptions;