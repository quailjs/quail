quail.definitionListsAreUsed = function() {
  quail.html.find('p, li').each(function() {
    var $item = $(this);
    $(this).find('span, strong, em, b, i').each(function() {
      if ($(this).text().length < 50 && $item.text().search($(this).text()) === 0) {
        if ($(this).is('span')) {
          if ($(this).css('font-weight') === $item.css('font-weight') &&
              $(this).css('font-style') === $item.css('font-style') ) {
            return;
          }
        }
        quail.testFails('definitionListsAreUsed', $item);
      }
    });
  });
};