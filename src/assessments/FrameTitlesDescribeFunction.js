/**
 * Not yet implemented.
 */
var FrameTitlesDescribeFunction = {
  run: function () {
    return;
  },

  meta: {
    testability: 0,
    title: {
      en: 'All \"frame\" elements should have a \"title\" attribute that describes the purpose of the frame',
      nl: 'Alle \"frame\" elementen moeten een \"title\"-attribuut hebben dat het doel van het frame beschrijft'
    },
    description: {
      en: 'Each <code>frame</code> elements should have a \"title\" attribute which describes the purpose or function of the frame.',
      nl: 'Elk <code>frame</code>-element moet een \"title\"-attribuut hebben dat het doel of de functie van het frame beschrijft.'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques: [
            'H64'
          ]
        }
      }
    },
    tags: [
      'deprecated',
      'frame'
    ],
    options: {
      attribute: 'title'
    }
  }
};
module.exports = FrameTitlesDescribeFunction;
