quail.preShouldNotBeUsedForTabularLayout = function() {
  quail.html.find('pre').each(function() {
    var rows = $(this).text().split(/[\n\r]+/);
    if(rows.length > 1 && $(this).text().search(/\t/) > -1) {
      quail.testFails('preShouldNotBeUsedForTabularLayout', $(this));
    }
  });
};
