/**
 * Helper object that tests videos.
 * @todo - allow this to be exteded more easily.
 */
quail.components.video = {

  /**
   * Iterates over listed video providers and runs their `isVideo` method.
   * @param jQuery $element
   *   An element in a jQuery wrapper.
   *
   * @return Boolean
   *   Whether the element is a video.
   */
  isVideo : function(element) {
    var isVideo = false;
    $.each(this.providers, function() {
      if (element.is(this.selector) && this.isVideo(element)) {
        isVideo = true;
      }
    });
    return isVideo;
  },

  findVideos : function(element, callback) {
    $.each(this.providers, function(name, provider) {
      element.find(this.selector).each(function() {
        var video = $(this);
        if (provider.isVideo(video)) {
          provider.hasCaptions(video, callback);
        }
      });
    });
  },

  providers : {

    flash : {

      selector : 'object',

      isVideo : function(element) {
        var isVideo = false;
        if (element.find('param').length === 0) {
          return false;
        }
        element.find('param[name=flashvars]').each(function() {
          if ($(this).attr('value').search(/\.(flv|mp4)/i) > -1) {
            isVideo = true;
          }
        });
        return isVideo;
      },

      hasCaptions : function(element, callback) {
        var hasCaptions = false;
        element.find('param[name=flashvars]').each(function() {
          if (($(this).attr('value').search('captions') > -1 &&
             $(this).attr('value').search('.srt') > -1) ||
             $(this).attr('value').search('captions.pluginmode') > -1) {
            hasCaptions = true;
          }
        });
        callback(element, hasCaptions);
      }
    },

    videoElement : {

      selector : 'video',

      isVideo : function(element) {
        return element.is('video');
      },

      hasCaptions : function(element, callback) {
        var $captions = element.find('track[kind=subtitles], track[kind=captions]');
        if (!$captions.length) {
          callback(element, false);
          return;
        }
        var language = quail.components.language.getDocumentLanguage(element, true);
        if (element.parents('[lang]').length) {
          language = element.parents('[lang]').first().attr('lang').split('-')[0];
        }
        var foundLanguage = false;
        $captions.each(function() {
          if (!$(this).attr('srclang') || $(this).attr('srclang').toLowerCase() === language) {
            foundLanguage = true;
            try{
              var request = $.ajax({ url: $(this).attr('src'),
                        type: 'HEAD',
                        async: false,
                        error: function() { }
                       });
              if (request.status === 404) {
                foundLanguage = false;
              }
            }
            catch(e) {

            }
          }
        });
        if (!foundLanguage) {
          callback(element, false);
          return;
        }
        callback(element, true);
      }
    }
  }

};
