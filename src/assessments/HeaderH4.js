var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH4 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 4
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The header following an h4 is not an h6',
      nl: 'De header volgend op een h4 is geen h6'
    },
    description: {
      en: 'Header order should not skip a level. Do not follow a <code>h4</code> haeder with a <code>h6</code>.',
      nl: 'Headers mogen geen niveau overslaan. Laat een <code>h4/code> header niet volgen door een <code>h6</code>.'
    },
    guidelines: {
      wcag: {
        '2.4.6': {
          techniques: [
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
module.exports = HeaderH4;
