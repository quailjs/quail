var Case = require('Case');
const DOM = require('DOM');
var IsUnreadable = require('IsUnreadable');
var ImgImportantNoSpacerAlt = {
  run: function (test) {
    DOM.scry('img[alt]', test.get('scope')).forEach(function (element) {
      var width = ($(element).width()) ? $(element).width() : parseInt(DOM.getAttribute(element, 'width'), 10);
      var height = ($(element).height()) ? $(element).height() : parseInt(DOM.getAttribute(element, 'height'), 10);
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (IsUnreadable(DOM.getAttribute(element, 'alt').trim()) &&
          DOM.getAttribute(element, 'alt').length > 0 &&
          width > 50 &&
          height > 50) {
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
    testability: 0.5,
    title: {
      en: 'Images that are important should not have a purely white-space \"alt\" attribute',
      nl: 'Afbeeldingen die belangrijk zijn mogen geen leeg \"alt\"-attribuut hebben'
    },
    description: {
      en: 'Any image that is not used decorativey or which is purely for layout purposes cannot have an \"alt\" attribute that consists solely of white space (i.e. a space).',
      nl: 'Elke afbeelding die niet ter decoratie is of die alleen voor lay-out doeleinden is bedoeld, mag geen leeg \"alt\"-attribuut hebben (bijvoorbeeld alleen een spatie).'
    },
    guidelines: [

    ],
    tags: [
      'image',
      'content'
    ]
  }
};
module.exports = ImgImportantNoSpacerAlt;
