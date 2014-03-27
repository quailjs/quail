quail.headersUseToMarkSections = function() {
  quail.html.find('p').each(function() {
    var $paragraph = $(this);
    $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
      if ($paragraph.text().trim() === $(this).text().trim()) {
        quail.testFails('headersUseToMarkSections', $paragraph);
      }
    });
  });

  quail.html.find('ul, ol').each(function() {
    var $list = $(this);
    if ($list.prevAll(':header').length ||
      $list.find('li').length !== $list.find('li:has(a)').length) {
      return;
    }
    var isNavigation = true;
    $list.find('li:has(a)').each(function() {
      if ($(this).text().trim() !== $(this).find('a:first').text().trim()) {
        isNavigation = false;
      }
    });
    if (isNavigation) {
      quail.testFails('headersUseToMarkSections', $list);
    }
  });
};
