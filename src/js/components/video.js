/**
 * Helper object that tests videos.
 * @todo - allow this to be exteded more easily.
 */
quail.components.video = {
    
  youTube : {
    
    videoID : '',
    
    apiUrl : 'http://gdata.youtube.com/feeds/api/videos/?q=%video&caption&v=2&alt=json',
    
    isVideo : function(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[7].length === 11) {
        this.videoID = match[7];
        return true;
      }
      return false;
    },
    
    hasCaptions : function(callback) {
      $.ajax({url : this.apiUrl.replace('%video', this.videoID),
              async : false,
              dataType : 'json',
              success : function(data) {
                callback((data.feed.openSearch$totalResults.$t > 0) ? true : false);
              }
      });
    }
  }
};