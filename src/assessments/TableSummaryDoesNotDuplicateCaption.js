var CleanStringComponent = require('CleanStringComponent');
var Case = require('Case');
const DOM = require('DOM');
var TableSummaryDoesNotDuplicateCaption = {
  run: function (test) {
    DOM.scry('table[summary]:has(caption)', test.get('scope')).forEach(function (element) {
      if (CleanStringComponent(DOM.scry('caption:first', element).attr('summary')) === CleanStringComponent($(element).text())) {
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
    testability: 1,
    title: {
      en: 'Table \"summary\" elements should not duplicate the \"caption\" element',
      nl: 'Tabel \"summary\"-elementen mogen niet hetzelfde zijn als het \"caption\"-element'
    },
    description: {
      en: 'The summary and the caption must be different, as both provide different information. A <code>caption</code>. /code element identifies the table, while the \"summary\" attribute describes the table contents.',
      nl: 'De samenvatting en beschrijving van een tabel moeten verschillen, want ze bieden verschillende informatie. Een <code>caption</code>-element identificeert welke tabel het betreft en het \"summary\"-attribuut beschrijft de inhoud van de tabel.'
    },
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableSummaryDoesNotDuplicateCaption;
