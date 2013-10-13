quail.emoticonsExcessiveUse = function() {
  var emoticons = quail.loadString('emoticons');
  var count = 0;
  quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
    var $element = $(this);
    $.each($element.text().split(' '), function(index, word) {
      if(emoticons.indexOf(word) > -1) {
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
