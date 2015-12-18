var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var ListOfLinksUseList = {
  run: function (test) {
    var unreadableText = /(♦|›|»|‣|▶|.|◦|>|✓|◽|•|—|◾|\||\*|&bull;|&#8226;)/g;
    test.get('scope').find('a').each(function () {
      var _case = test.add(Case({
        element: this
      }));
      // Only test if there's another a tag.
      if ($(this).next('a').length) {
        var nextText = $(this).get(0).nextSibling.wholeText.replace(unreadableText, '');
        if (!$(this).parent('li').length && IsUnreadable(nextText)) {
          _case.set({
            status: 'failed'
          });
        }
        else {
          _case.set({
            status: 'passed'
          });
        }
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'A list of links separated by non-readable characters should be in an ul or ol',
      nl: 'Een lijst van links die worden gescheiden door onleesbare tekens moeten in een bulleted of genummerde lijst staan'
    },
    description: {
      en: 'A list of links without separation between them should be placed in an ol or ul element.',
      nl: 'Een lijst van links die niet duidelijk gescheiden zijn moeten in een bulleted of genummerde lijst staan.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H48'
          ]
        }
      }
    },
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = ListOfLinksUseList;
