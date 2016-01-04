var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var ImgAltNotEmptyInAnchor = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('a[href]', scope)
        .filter((element) => DOM.scry('img', element).length > 0)
        .forEach(function (element) {
          var $a = element;
          var text = DOM.text($a);

          var _case = Case({
            element: element
          });
          test.add(_case);

          // Concat all alt attributes of images to the text of the paragraph
          DOM.scry('img[alt]', $a).forEach(function (element) {
            text += ' ' + DOM.getAttribute(element, 'alt');
          });

          if (IsUnreadable(text)) {
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
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'An image within a link cannot have an empty \"alt\" attribute if there is no other text within the link',
      nl: 'Een afbeelding binnen een link mag geen leeg \"alt\"-attribuut hebben als er geen andere tekst is in de link'
    },
    description: {
      en: 'Any image that is within a link (an <code>a</code> element) that has no other text cannot have an empty or missing \"alt\" attribute.',
      nl: 'Elke afbeelding binnen een link (een <code>a</code>-element) die geen andere tekst heeft, mag geen leeg of ontbrekend \"alt\"-attribuut hebben.'
    },
    guidelines: {
      508: [
        'a'
      ],
      wcag: {
        '2.4.4': {
          techniques: [
            'H30'
          ]
        }
      }
    },
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgAltNotEmptyInAnchor;
