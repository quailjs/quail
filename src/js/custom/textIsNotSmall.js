quail.textIsNotSmall = function() {
  quail.html.find(quail.textSelector).each(function() {
    var fontSize = $(this).css('font-size');
    if(fontSize.search('em') > 0) {
      fontSize = quail.components.convertToPx(fontSize);
    }
    fontSize = parseInt(fontSize.replace('px', ''), 10);
    if(fontSize < 10) {
      quail.testFails('textIsNotSmall', $(this));
    }
  });
};
