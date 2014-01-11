quail.tableUsesAbbreviationForHeader = function() {
  quail.html.find('th:not(th[abbr])').each(function() {
    if($(this).text().length > 20) {
      quail.testFails('tableUsesAbbreviationForHeader', $(this));
    }
  });
};
