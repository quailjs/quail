var ValidURLComponent = require('ValidURLComponent');
var Case = require('Case');
var ImgHasLongDesc = {
  run: function (test) {
    test.get('scope').find('img[longdesc]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if ($(this).attr('longdesc') === $(this).attr('alt') ||
          !ValidURLComponent($(this).attr('longdesc'))) {
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
    testability: 1,
    title: {
      en: 'A \"longdesc\" attribute is required for any image where additional information not in the \"alt\" attribute is required',
      nl: 'Een \"longdesc\"-attribuut is verplicht voor elke afbeelding waar aanvullende informatie niet benodigd is in het \"alt\"-attribuut'
    },
    description: {
      en: 'Any image that has an \"alt\" attribute that does not fully convey the meaning of the image must have a \"longdesc\" attribute.',
      nl: 'Elke afbeelding die een \"alt\"-attribuut heeft dat de volledige betekenis van de afbeelding bevat, moet een \"longdesc\"-attribuut hebben.'
    },
    guidelines: {
      wcag: {
        '2.4.4': {
          techniques: [
            'G91'
          ]
        },
        '2.4.9': {
          techniques: [
            'G91'
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
module.exports = ImgHasLongDesc;
