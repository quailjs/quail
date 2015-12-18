/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var TableCaptionIdentifiesTable = {
  run: function (test, options) {

    var selector = 'caption';

    this.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: (options.test ? 'inapplicable' : 'passed')
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(this).is(options.test)) {
            status = 'passed';
          }
          else {
            status = 'failed';
          }

          test.add(Case({
            element: this,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Captions should identify their table',
      nl: 'Beschrijvingen moeten hun tabellen identificeren'
    },
    description: {
      en: 'Check to make sure that a table\'s caption identifies the table with a name, figure number, etc.',
      nl: 'Controleer of de beschrijving van een tabel de tabel identificeert met een naam, nummer en dergelijke.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H39'
          ]
        }
      }
    },
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableCaptionIdentifiesTable;
