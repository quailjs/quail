var Case = require('Case');
var DOM = require('DOM');
var AMustHaveTitle = {
  run: function (test) {
    this.get('scope').each(function () {
      var links = DOM.scry('a', this);

      links.each(function (i, link) {
        // Has a title attribute and that attribute has a value, then pass.
        var title = $(link).attr('title');
        if (typeof title === 'string' && title.length > 0) {
          test.add(Case({
            element: this,
            status: 'passed'
          }));
        }
        // Does not have a title attribute or the attribute does not have a value.
        else if (typeof title === 'undefined' || !title.length) {
          test.add(Case({
            element: this,
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
