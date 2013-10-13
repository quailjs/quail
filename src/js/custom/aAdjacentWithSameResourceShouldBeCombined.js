quail.aAdjacentWithSameResourceShouldBeCombined = function() {
  quail.html.find('a').each(function() {
    if($(this).next('a').attr('href') === $(this).attr('href')) {
      quail.testFails('aAdjacentWithSameResourceShouldBeCombined', $(this));
    }
  });
};
