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
  quail.html.find('object').each(function() {
    var $object = $(this);
    if(!$object.find('param').length) {
      return;
    }
    var isVideo = false;
    $object.find('param').each(function() {
      if($(this).attr('value').search('.flv') > -1) {
        isVideo = true;
      }
    });
    if(isVideo) {
      var hasCaptions = false;
      $object.find('param[name=flashvars]').each(function() {
        if($(this).attr('value').search('captions') > -1 &&
           $(this).attr('value').search('.srt') > -1) {
          hasCaptions = true;
        }
      });
      if(!hasCaptions) {
        quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $object);
      }  
    }
  });
  quail.html.find('video').each(function() {
    var $video = $(this);
    var $captions = $video.find('track[kind=subtitles], track[kind=captions]');
    if(!$captions.length) {
      quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
    }
    else {
      var language = quail.components.language.getDocumentLanguage(true);
      if($video.parents('[lang]').length) {
        language = $video.parents('[lang]').first().attr('lang').split('-')[0];
      }
      var foundLanguage = false;
      $captions.each(function() {
        if(!$(this).attr('srclang') || $(this).attr('srclang').toLowerCase() === language) {
          foundLanguage = true;
          try{
            var request = $.ajax({ url: $(this).attr('src'),
                      type: 'HEAD',
                      async: false,
                      error: function() { }
                     });
            if(request.status === 404) {
              quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
            }
          }
          catch(e) {

          }
        }
      });
      if(!foundLanguage) {
        quail.testFails('videosEmbeddedOrLinkedNeedCaptions', $video);
      }
    }
  });
};
