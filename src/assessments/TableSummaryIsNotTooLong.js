var Case = require('Case');
var TableSummaryIsNotTooLong = {
  run: function (test) {
    test.get('scope').find('table[summary]').each(function () {
      if ($(this).attr('summary').trim().length > 100) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 0,
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableSummaryIsNotTooLong;
