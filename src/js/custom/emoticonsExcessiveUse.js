quail.emoticonsExcessiveUse = function() {
  var count = 0;
  quail.html.find(quail.textSelector).each(function() {
    var $element = $(this);
    $.each($element.text().split(' '), function(index, word) {
      if(word.search(quail.emoticonRegex) > -1 ) {
        count++;
      }
      if(count > 4) {
        return;
      }
    });
    if(count > 4) {
      quail.testFails('emoticonsExcessiveUse', $element);
    }
  });
};
