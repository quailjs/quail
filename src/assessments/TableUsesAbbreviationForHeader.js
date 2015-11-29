var Case = require('Case');
var TableUsesAbbreviationForHeader = {
  run: function (test) {
    test.get('$scope').find('th:not(th[abbr])').each(function () {
      if ($(this).text().length > 20) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Table headers over 20 characters should provide an \"abbr\" attribute',
      nl: 'Tabelkoppen met meer dan 20 tekens moeten een \"abbr\"-attribuut hebben'
    },
    description: {
      en: 'For long table headers, use an \"abbr\" attribute that is less than short (less than 20 characters long).',
      nl: 'Gebruik een \"abbr\"-attribuut korter dan 20 tekens voor lange tabelkoppen.'
    },
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableUsesAbbreviationForHeader;
