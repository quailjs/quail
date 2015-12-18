var Case = require('Case');
const DOM = require('DOM');
var TableSummaryIsNotTooLong = {
  run: function (test) {
    DOM.scry('table[summary]', test.get('scope')).each(function () {
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
