/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
var DOM = require('DOM');
var TableDataShouldHaveTh = {
  run: function (test) {

    var selector = 'table';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';
          var hasHeading = DOM.scry('th', this).length > 0;
          // If a test is defined, then use it
          if (hasHeading) {
            status = 'passed';
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
    testability: 1,
    title: {
      en: 'Data tables should contain \"th\" elements',
      nl: 'Datatabellen moeten \"th\"-elementen bevatten'
    },
    description: {
      en: 'Tables which contain data (as opposed to layout tables) should contain <code>th</code> elements to mark headers for screen readers and enhance the structure of the document.',
      nl: 'Tabellen die data bevatten (in tegenstelling tot lay-out tabellen) moeten <code>th</code>-elementen bevatten om koppen te markeren voor schermlezers en om de structuur van het document te verbeteren.'
    },
    guidelines: {
      508: [
        'g'
      ],
      wcag: {
        '1.3.1': {
          techniques: [
            'F91'
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
module.exports = TableDataShouldHaveTh;
