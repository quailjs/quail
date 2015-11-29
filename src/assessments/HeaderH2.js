var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH2 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 2
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The header following an h2 is not h4, h5, or h6',
      nl: 'De header volgend op een h2 is geen h4, h5, of h6'
    },
    description: {
      en: 'Header order should not skip a level. Do not follow a <code>h2</code> header with a <code>h4</code>, <code>h5</code>, or <code>h6</code>.',
      nl: 'Headers mogen geen niveau overslaan. Laat een <code>h2</code>-header niet volgen door een <code>h4</code>, <code>h5</code>, of <code>h6</code>.'
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
module.exports = HeaderH2;
