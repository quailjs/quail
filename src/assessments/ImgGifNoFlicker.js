/**
 * Not yet implemented.
 */
var ImgGifNoFlicker = {
  run: function () {
    return;
  },

  meta: {
    testability: 1,
    title: {
      en: 'Any animated GIF should not flicker',
      nl: 'Geen enkele animated GIF mag knipperen of flitsen'
    },
    description: {
      en: 'Animated GIF files should not flicker with a frequency over 2 Hz and lower than 55 Hz. You can check the flicker rate of this GIF <a href=\"http://tools.webaccessibile.org/test/check.aspx\">using an online tool</a>.',
      nl: 'Animated GIF-bestanden mogen niet knipperen of flitsen met een frequentie hoger dan 2 Hz en lager dan 55 Hz. Controleer de frequentie van deze GIF met een <a href=\"http://tools.webaccessibile.org/test/check.aspx\">online tool</a>.'
    },
    guidelines: {
      508: [
        'j'
      ],
      wcag: {
        '2.2.2': {
          techniques: [
            'G152'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgGifNoFlicker;
