var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
const DOM = require('DOM');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var DocumentVisualListsAreMarkedUp = {
  run: function (test) {

    var itemStarters = [
      '♦', '›', '»', '‣', '▶', '◦', '✓', '◽', '•', '—', '◾', // single characters
      '-\\D', // dash, except for negative numbers
      '\\\\', // Just an escaped slash
      '\\*(?!\\*)', // *, but not ** (which could be a foot note)
      '\\.\\s', 'x\\s', // characters that should be followed by a space
      '&bull;', '&#8226;', // HTML entities
      '[0-9]+\\.', '\\(?[0-9]+\\)', // Numbers: 1., 13., 13), (14)
      '[\\u25A0-\\u25FF]', // Unicode characters that look like bullets
      '[IVX]{1,5}\\.\\s' // Roman numerals up to (at least) 27, followed by ". " E.g. II. IV.
    ];

    var symbols = RegExp(
      '(^|<br[^>]*>)' + // Match the String start or a <br> element
      '[\\s]*' + // Optionally followed by white space characters
      '(' + itemStarters.join('|') + ')', // Followed by a character that could indicate a list
    'gi'); // global (for counting), case insensitive (capitalisation in elements / entities)
    test.get('scope').forEach((scope) => {
      DOM.scry(TextSelectorComponent, scope)
        .filter(function (element) {
          return TextNodeFilterComponent(element);
        })
        .forEach(function (element) {
          var _case = Case({
            element: element
          });
          test.add(_case);
          var matches = DOM.text(element).match(symbols);
          _case.set({
            status: (matches && matches.length > 2) ? 'failed' : 'passed'
          });
        });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Visual lists of items are marked using ordered or unordered lists',
      nl: 'Lijsten moeten gemarkeerd worden als ordered of unordered lists'
    },
    description: {
      en: 'Use the ordered (<code>ol</code>) or unordered (<code>ul</code>) elements for lists of items, instead of just using new lines which start with numbers or characters to create a visual list.',
      nl: 'Gebruik ordered (<code>ol</code>) of unordered (<code>ul</code>) elementen voor lijsten, in plaats van een nieuwe regel per item aan te maken die je laat beginnen met een nummer of teken om een visuele lijst te maken.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H28',
            'H48',
            'T2'
          ]
        }
      }
    },
    tags: [
      'list',
      'semantics',
      'content'
    ]
  }
};
module.exports = DocumentVisualListsAreMarkedUp;
