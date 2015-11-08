'use strict';

var TableUsesAbbreviationForHeader = function TableUsesAbbreviationForHeader(quail, test, Case) {
  test.get('$scope').find('th:not(th[abbr])').each(function () {
    if ($(this).text().length > 20) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
module.exports = TableUsesAbbreviationForHeader;