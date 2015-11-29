var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH3 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 3
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'The header following an h3 is not an h5 or h6',
      nl: 'De header volgend op een h3 is geen h5, of h6'
    },
    description: {
      en: 'Header order should not skip a level. Do not follow a <code>h3</code> header with a <code>h5<code> or <code>h6</code>.',
      nl: 'Headers mogen geen niveau overslaan. Laat een <code>h3</code>-header niet volgen door een <code>h5</code>, of <code>h6</code>.'
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
module.exports = HeaderH3;
