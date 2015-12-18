var Case = require('Case');
const DOM = require('DOM');
var AMustHaveTitle = {
  run: function (test) {
    debugger;
    test.get('scope').forEach(function (element) {
      var links = DOM.scry('a', element);

      links.forEach(function (link) {
        // Has a title attribute and that attribute has a value, then pass.
        var title = link.getAttribute('title');
        if (typeof title === 'string' && title.length > 0) {
          test.add(Case({
            element: link,
            status: 'passed'
          }));
        }
        // Does not have a title attribute or the attribute does not have a value.
        else if (!title || !title.length) {
          test.add(Case({
            element: link,
            status: 'failed'
          }));
        }
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All links must have a \"title\" attribute',
      nl: 'Alle links moeten een \"title\"-attribuut hebben'
    },
    description: {
      en: 'Every link must have a \"title\" attribute.',
      nl: 'Zorg ervoor dat elke link is voorzien van een \"title\"-attribuut.'
    },
    guidelines: [

    ],
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = AMustHaveTitle;
