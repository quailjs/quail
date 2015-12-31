var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var ALinkWithNonText = {
  run: function (test) {
    DOM.scry('a', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (!$(element).is('a:has(img, object, embed)[href]')) {
        _case.set({
          status: 'inapplicable'
        });
        return;
      }
      if (!IsUnreadable($(element).text())) {
        _case.set({
          status: 'passed'
        });
        return;
      }
      var unreadable = 0;
      DOM.scry('img, object, embed', element).forEach(function (element) {
        if ((DOM.is(element, 'img') && IsUnreadable($(element).attr('alt'))) ||
          (!DOM.is(element, 'img') && IsUnreadable($(element).attr('title')))) {
          unreadable++;
        }
      });
      if (DOM.scry('img, object, embed', element).length === unreadable) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        _case.set({
          status: 'passed'
        });
      }
    });
  },

  meta: {
    title: {
      en: 'Links with only non-text content should be readable',
      nl: 'Links zonder tekstuele content moeten leesbaar zijn'
    },
    description: {
      en: 'If a link contains only non-text content like an image, that content must be readable by assistive technology.',
      nl: 'Als een link alleen maar niet-tekstuele content bevat zoals een afbeelding, moet deze content leesbaar worden gemaakt door middel van daarvoor geschikte technologie.'
    },
    guidelines: {
      wcag: {
        '2.4.4': {
          techniques: [
            'H2',
            'F89'
          ]
        },
        '2.4.9': {
          techniques: [
            'F89'
          ]
        },
        '4.1.2': {
          techniques: [
            'F89'
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
module.exports = ALinkWithNonText;
