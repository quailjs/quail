quail.pNotUsedAsHeader = function() {
  var priorStyle = { };
  quail.html.find('p').each(function() {
    if($(this).text().search('.') < 1) {
      var $paragraph = $(this);
      $.each(quail.suspectPHeaderTags, function(index, tag) {
        if($paragraph.find(tag).length) {
          $paragraph.find(tag).each(function() {
            if($(this).text().trim() === $paragraph.text().trim()) {
              quail.testFails('pNotUsedAsHeader', $paragraph);
            }
          });
        }
      });
      $.each(quail.suspectPCSSStyles, function(index, style) {
        if(typeof priorStyle[style] !== 'undefined' &&
           priorStyle[style] !== $paragraph.css(style)) {
          quail.testFails('pNotUsedAsHeader', $paragraph);
        }
        priorStyle[style] = $paragraph.css(style);
      });
      if($paragraph.css('font-weight') === 'bold') {
        quail.testFails('pNotUsedAsHeader', $paragraph);
      }
    }
  });
};
