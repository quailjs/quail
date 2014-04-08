quail.videosEmbeddedOrLinkedNeedCaptions = function (quail, test, Case) {

  quail.components.video.findVideos(test.get('$scope'), function(element, pass) {
    var _case = Case({
      element: element.get(0),
      expected: element.closest('.quail-test').data('expected')
    });
    test.add(_case);
    if (!pass) {
      _case.set({
        'status': 'failed'
      });
    }
    else {
      _case.set({
        'status': 'passed'
      });
    }
  });

};
