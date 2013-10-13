quail.documentVisualListsAreMarkedUp = function() {
  var listQueues = [/\*/g, '<br>*', '&bull;', '&#8226'];
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    $.each(listQueues, function(index, item) {
      if($element.text().split(item).length > 2) {
        quail.testFails('documentVisualListsAreMarkedUp', $element);
      }
    });
  });
};
