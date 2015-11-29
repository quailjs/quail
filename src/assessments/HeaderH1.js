var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH1 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 1
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The header following an h1 is not h3 through h6',
      nl: 'De header die volgt op een h1 is niet h3 tot h6'
    },
    description: {
      en: 'Header order should not skip a level. Do not follow a <code>h1</code> header with a <code>h3</code>, <code>h4</code>, <code>h5</code>, or <code>h6</code>.',
      nl: 'Headers mogen geen niveau overslaan. Laat een <code>h1</code>-header niet volgen door een <code>h3</code>, <code>h4</code>, <code>h5</code>, of <code>h6</code>.'
    },
    guidelines: {
      wcag: {
        '2.4.6': {
          techniques:  [
            'G130'
          ]
        }
      }
    },
    tags: [
      'header',
      'content'
    ]
  }
};
module.exports = HeaderH1;
