quail.videosEmbeddedOrLinkedNeedCaptions = function (quail, test, Case) {

  quail.components.video.findVideos(test.get('$scope'), function(element, pass) {
    if (!pass) {
      test.add(Case({
        element: element[0],
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(element)),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: element[0],
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(element)),
        status: 'passed'
      }));
    }
  });
};
