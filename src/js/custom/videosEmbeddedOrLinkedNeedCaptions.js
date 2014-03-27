quail.videosEmbeddedOrLinkedNeedCaptions = function() {

  quail.components.video.findVideos(quail.html, function(element, pass) {
    if (!pass) {
      quail.testFails('videosEmbeddedOrLinkedNeedCaptions', element);
    }
  });

};
