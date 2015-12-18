var Case = require('Case');
const DOM = require('DOM');
var DOM = require('DOM');
var EmbedHasAssociatedNoEmbed = {
  run: function (test) {
    DOM.scry('embed', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        status: (DOM.scry('noembed').length || $(this).next().is('noembed', this)) ? 'passed' : 'failed'
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"embed\" elements have an associated \"noembed\" element',
      nl: 'Alle \"embed\" elementen moeten een bijbehorend \"noembed\"-element hebben'
    },
    description: {
      en: 'Because some users cannot use the <code>embed</code> element, provide alternative content in a <code>noembed</code> element.',
      nl: 'Sommige gebruikers kunnen het <code>embed</code>-element niet gebruiken. Biedt hiervoor alternatieve content aan in een <code>noembed</code>-element.'
    },
    guidelines: [

    ],
    tags: [
      'object',
      'embed',
      'content'
    ]
  }
};
module.exports = EmbedHasAssociatedNoEmbed;
