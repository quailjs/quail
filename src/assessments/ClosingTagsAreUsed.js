/**
 * Not yet implemented.
 */
var ClosingTagsAreUsed = {
  run: function (test) {
    return;
  },

  meta: {
    testability: 1,
    title: {
      en: 'All tags that require closing tags have closing tags',
      nl: 'Alle tags die een afsluitende tag behoeven, hebben een afsluitende tag'
    },
    description: {
      en: 'When using tags such as p, ul, or li, there must be a closing tag.',
      nl: 'Gebruik voor tags als p, ul, of li altijd een afsluitende tag, dus /p, /ul, /li.'
    },
    guidelines: {
      wcag: {
        '4.1.1': {
          techniques:  [
            'H74'
          ]
        }
      }
    },
    tags: [
      'html'
    ]
  }
};
module.exports = ClosingTagsAreUsed;
