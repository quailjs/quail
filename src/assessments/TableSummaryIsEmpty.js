/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var TableSummaryIsEmpty = {
  run: function (test, options) {
    options = options || {
      selector: 'table',
      attribute: 'summary',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'All data tables should have a summary',
      nl: 'Alle datatabellen moeten een samenvatting hebben'
    },
    description: {
      en: 'If a table contains data, it should have a \"summary\" attribute.',
      nl: 'Als een tabel data bevat, moet hij een \"summary\"-attribuut hebben.'
    },
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableSummaryIsEmpty;
