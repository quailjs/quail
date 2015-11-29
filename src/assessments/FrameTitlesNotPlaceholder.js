/**
 * Not yet implemented.
 */
var FrameTitlesNotPlaceholder = {
  run: function () {
    return;
  },

  meta: {
    testability: 1,
    title: {
      en: 'Frames cannot have \"title\" attributes that are just placeholder text',
      nl: 'Frames mogen geen \"title\"-attribuut hebben met placeholdertekst'
    },
    description: {
      en: 'Frame \"title\" attributes should not be simple placeholder text like \"frame\".',
      nl: 'Frame \"title\"-attributen mogen geen placeholdertekst bevatten zoals \"frame\".'
    },
    guidelines: {
      wcag: {
        '2.4.1': {
          techniques: [
            'H64'
          ]
        },
        '4.1.2': {
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
module.exports = FrameTitlesNotPlaceholder;
