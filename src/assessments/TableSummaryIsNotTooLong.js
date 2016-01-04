var Case = require('Case');
const DOM = require('DOM');
var TableSummaryIsNotTooLong = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('table[summary]', scope).forEach(function (element) {
        if (DOM.getAttribute(element, 'summary').trim().length > 100) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        }
      });
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
