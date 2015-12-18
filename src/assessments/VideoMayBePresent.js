var Case = require('Case');
var DOM = require('DOM');
var VideoMayBePresent = {
  run: function (test) {

    var videoExtensions = ['webm', 'flv', 'ogv', 'ogg', 'avi', 'mov', 'qt', 'wmv', 'asf',
    'mp4', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpg', 'mpe', 'mpv', 'm2v', '3gp', '3g2'];
    var videoHosts = ['//www.youtube.com/embed/', '//player.vimeo.com/video/'];

    test.get('scope').each(function () {
      var $this = $(this);
      var hasCase = false; // Test if a case has been created

      // video elm is definately a video, and objects could be too.
      $this.find('object, video').each(function () {
        hasCase = true;
        test.add(Case({
          element: this,
          status: 'cantTell'
        }));
      });

      // Links refering to files with an video extensions are probably video
      // though the file may not exist.
      DOM.scry('a[href]', $this).each(function () {
        var $this = $(this);
        var extension = $this.attr('href').split('.').pop();
        if ($.inArray(extension, videoExtensions) !== -1) {
          hasCase = true;
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        }
      });

      // some iframes with URL's of known video providers are also probably videos
      DOM.scry('iframe', $this).each(function () {
        if (this.src.indexOf(videoHosts[0]) !== -1 ||
        this.src.indexOf(videoHosts[1]) !== -1) {
          hasCase = true;
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        }
      });

      // if no case was added, return inapplicable
      if (!hasCase) {
        test.add(Case({
          element: this,
          status: 'inapplicable'
        }));
      }

    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Video or object uses a link that points to a file with a video extension',
      nl: 'Video of object met een link naar een bestand met een video extensie'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: [

    ],
    tags: [
      'link',
      'video'
    ]
  }
};
module.exports = VideoMayBePresent;
