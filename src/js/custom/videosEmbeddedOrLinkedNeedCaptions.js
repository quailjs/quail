quail.videosEmbeddedOrLinkedNeedCaptions = function() {
  quail.html.find('a, iframe').each(function() {
    var $video = $(this);
    var attribute = ($(this).is('iframe')) ? 'src' : 'href';
    $.each(quail.components.video, function(type, callback) {
      if(callback.isVideo($video.attr(attribute))) {
        callback.hasCaptions(function(hasCaptions) {
          if(!hasCaptions) {
            quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
          }
        });
      }
    });
  });
  quail.html.find('video:not(video:has(track[kind=subtitles], track[kind=captions]))').each(function() {
    quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $(this));
  });
};
