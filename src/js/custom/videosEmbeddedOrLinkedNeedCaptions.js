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
  quail.html.find('video').each(function() {
    var $video = $(this);
    var $captions = $video.find('track[kind=subtitles], track[kind=captions]');
    if(!$captions.length) {
      quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
    }
    else {
      $captions.each(function() {
        if($.ajax({ url : $(this).attr('src'), async: false }).status === 404) {
          quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
        }
      });
    }
  });
};
