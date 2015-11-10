var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var DocumentVisualListsAreMarkedUp = function (quail, test) {

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

  test.get('$scope')
    .find(TextSelectorComponent)
    .filter(function (index, element) {
      return TextNodeFilterComponent(element);
    })
    .each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var matches = $(this).html().match(symbols);
      _case.set({
        status: (matches && matches.length > 2) ? 'failed' : 'passed'
      });
    });
};
module.exports = DocumentVisualListsAreMarkedUp;
