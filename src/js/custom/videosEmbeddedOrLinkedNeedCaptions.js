quail.videosEmbeddedOrLinkedNeedCaptions = function() {
  quail.html.find('a').each(function() {
    var $link = $(this);
    $.each(quail.videoServices, function(type, callback) {
      if(callback.isVideo($link.attr('href'))) {
        callback.hasCaptions(function(hasCaptions) {
          if(!hasCaptions) {
            quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $link);
          }
        });
      }
    });
  });
};
