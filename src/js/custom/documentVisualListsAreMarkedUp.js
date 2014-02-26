quail.documentVisualListsAreMarkedUp = function() {
  quail.html.find(quail.textSelector).each(function() {
    var $element = $(this);
    $.each(quail.strings.symbols, function(index, item) {
      if($element.text().split(item).length > 2) {
        quail.testFails('documentVisualListsAreMarkedUp', $element);
      }
    });
  });
};
