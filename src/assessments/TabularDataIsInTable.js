var Case = require('Case');
var TabularDataIsInTable = {
  run: function (test) {
    test.get('$scope').find('pre').each(function () {
      if ($(this).html().search('\t') >= 0) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
      else {
        test.add(Case({
          element: this,
          status: 'passed'
        }));
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'All tabular information should use a table',
      nl: 'Alle tabelinformatie moet ook daadwerkelijk in een tabel staan'
    },
    description: {
      en: 'Tables should be used when displaying tabular information.',
      nl: 'Gebruik een echte tabel wanneer je tabelinformatie wilt tonen.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'F33',
            'F34',
            'F48'
          ]
        },
        '1.3.2': {
          techniques: [
            'F33',
            'F34'
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
module.exports = TabularDataIsInTable;
