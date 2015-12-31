var Case = require('Case');
const DOM = require('DOM');
var ConvertToPxComponent = require('ConvertToPxComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var TextSelectorComponent = require('TextSelectorComponent');

var TextIsNotSmall = {
  run: function (test) {
    DOM.scry(TextSelectorComponent, test.get('scope'))
      .filter(function (element) {
        return TextNodeFilterComponent(element);
      })
      .forEach(function (element) {
        var fontSize = DOM.getStyle(element, 'font-size');
        if (fontSize.search('em') > 0) {
          fontSize = ConvertToPxComponent(fontSize);
        }
        fontSize = parseInt(fontSize.replace('px', ''), 10);

        if (fontSize < 10) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        }
        else {
          test.add(Case({
            element: element,
            status: 'passed'
          }));
        }
      });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'The text size is not less than 9 pixels high',
      nl: 'De grootte van de tekst is meer dan 8 pixels hoog'
    },
    description: {
      en: 'To help users with difficulty reading small text, ensure text size is no less than 9 pixels high.',
      nl: 'Help gebruikers die moeite hebben met het lezen van kleine letters, door ervoor te zorgen dat tekst groter is dan 8 pixels hoog.'
    },
    guidelines: [

    ],
    tags: [
      'textsize',
      'content'
    ]
  }
};
module.exports = TextIsNotSmall;
