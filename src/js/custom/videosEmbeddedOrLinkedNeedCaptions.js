quail.videosEmbeddedOrLinkedNeedCaptions = function (quail, test, Case) {

  quail.components.video.findVideos(test.get('$scope'), function(element, pass) {
    if (!pass) {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this)),
        status: 'passed'
      }));
    }
  });

};
