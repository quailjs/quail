/**
 * Not yet implemented.
 */
var InputDoesNotUseColorAlone = {
  run: function (test) {
    return;
  },

  meta: {
    testability: 0,
    title: {
      en: 'An \"input\" element should not use color alone',
      nl: 'Een invoerveld mag niet alleen maar kleur gebruiken'
    },
    description: {
      en: 'All input elements should not refer to content by color alone.',
      nl: 'Elk invoerveld moet naar content verwijzen door middel van meer dan alleen kleur.'
    },
    guidelines: {
      508:  [
        'c'
      ]
    },
    tags: [
      'form',
      'color',
      'content'
    ]
  }
};
module.exports = InputDoesNotUseColorAlone;
