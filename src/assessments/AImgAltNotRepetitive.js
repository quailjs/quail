var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
const DOM = require('DOM');
var AImgAltNotRepetitive = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('a img[alt]', scope).forEach(function (element) {
        var _case = test.add(Case({
          element: element
        }));

        var alt = CleanStringComponent(DOM.getAttribute(element, 'alt'));
        var link = DOM
          .parents(element);
        link
          .unshift(element);
        link = link.find((el) => DOM.is(el, 'a'));
        var linkText = CleanStringComponent(DOM.text(link));

        if (alt.length > 0 && linkText.indexOf(alt) > -1) {
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
      en: 'When an image is in a link, its \"alt\" attribute should not repeat other text in the link',
      nl: 'Als een link een afbeelding bevat, moet het \"alt\"-attribuut niet dezelfde tekst bevatten als de linktekst'
    },
    description: {
      en: 'Images within a link should not have an alt attribute that simply repeats the text found in the link. This will cause screen readers to simply repeat the text twice.',
      nl: 'Als een link een afbeelding bevat, moet deze afbeelding een andere tekst in het alt-attribuut hebben dan de tekst in de link. Hiermee voorkom je dat een schermlezer dezelfde tekst twee keer voorleest.'
    },
    guidelines: {
      wcag: {
        '1.1.1': {
          techniques: [
            'H30'
          ]
        },
        '2.4.4': {
          techniques: [
            'H30'
          ]
        },
        '2.4.9': {
          techniques: [
            'H30'
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
module.exports = AImgAltNotRepetitive;
