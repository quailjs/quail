var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var ListOfLinksUseList = {
  run: function (test) {
    var unreadableText = /(♦|›|»|‣|▶|.|◦|>|✓|◽|•|—|◾|\||\*|&bull;|&#8226;)/g;
    DOM.scry('a', test.get('scope')).forEach(function (element) {
      var _case = test.add(Case({
        element: element
      }));
      // Only test if there's another a tag.
      var next = DOM.next(element);
      if (next && DOM.is(next, 'a')) {
        var nextText = $(element).get(0).nextSibling.wholeText.replace(unreadableText, '');
        if (!DOM.is(element.parentNode, 'li') && IsUnreadable(nextText)) {
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
