quail.headersUseToMarkSections = function() {
  quail.html.find('p').each(function() {
    var $paragraph = $(this);
    $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
      if ($paragraph.text().trim() === $(this).text().trim()) {
        quail.testFails('headersUseToMarkSections', $paragraph);
      }
    });
  });
};
