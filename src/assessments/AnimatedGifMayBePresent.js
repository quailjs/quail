var Case = require('Case');
const DOM = require('DOM');
var AnimatedGifMayBePresent = {
  run: function (test) {

    /**
     * Test if gif is animated
     * Implemented from: https://gist.github.com/3012623.git
     * @param src
     * @param ext
     * @param cb
     */
    function isAnimatedGif (src, ext, cb) {

      if (ext !== 'gif') {
        cb(false);
        return;
      }

      var request = new XMLHttpRequest();
      request.open('GET', src, true);
      request.responseType = 'arraybuffer';
      request.addEventListener('load', function () {
        var arr = new Uint8Array(request.response);
        var frames = 0;

        // make sure it's a gif (GIF8)
        if (arr[0] !== 0x47 || arr[1] !== 0x49 || arr[2] !== 0x46 || arr[3] !== 0x38) {
          cb(false);
          return;
        }

        // ported from php http://www.php.net/manual/en/function.imagecreatefromgif.php#104473
        // an animated gif contains multiple "frames", with each frame having a
        // header made up of:
        // * a static 4-byte sequence (\x00\x21\xF9\x04)
        // * 4 variable bytes
        // * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)
        // We read through the file til we reach the end of the file, or we've found
        // at least 2 frame headers
        for (var i = 0; i < arr.length - 9; i++) {
          if (arr[i] === 0x00 && arr[i + 1] === 0x21 &&
            arr[i + 2] === 0xF9 && arr[i + 3] === 0x04 &&
            arr[i + 8] === 0x00 &&
            (arr[i + 9] === 0x2C || arr[i + 9] === 0x21)) {
            frames++;
          }
          if (frames > 1) {
            cb(true);
            return;
          }
        }

        cb(false);
      });
      request.send();
    }

    test.get('scope').forEach(function (scope) {
      DOM.scry('img', scope).forEach(function (element) {

        var _case = Case({
          element: element
        });
        test.add(_case);

        var imgSrc = DOM.getAttribute(element, 'src');
        var ext = DOM.getAttribute(element, 'src').split('.').pop().toLowerCase();

        if (ext !== 'gif') {
          _case.set({
            status: 'inapplicable'
          });
          return;
        }

        isAnimatedGif(imgSrc, ext, function (animated) {
          if (animated) {
            _case.set({
              status: 'cantTell'
            });
            return;
          }
          else {
            _case.set({
              status: 'inapplicable'
            });
            return;
          }
        });
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Test if a .gif is used on the page. Test if the .gif contains more then one frame',
      nl: 'Test of een .gif afbeelding gebruikt is op de pagina. Test of het .gif bestand uit meer dan één frame bestaat'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: [

    ],
    tags: [
      'link',
      'gif'
    ]
  }
};
module.exports = AnimatedGifMayBePresent;
