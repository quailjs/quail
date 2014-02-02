quail.languageDirAttributeIsUsed = function() {
  var currentDirection = (quail.html.attr('dir')) ? quail.html.attr('dir').toLowerCase() : 'ltr';
  var oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
  var textDirection = quail.components.language.textDirection;
  quail.html.find(quail.textSelector).each(function() {
    if($(this).attr('dir')) {
      currentDirection = $(this).attr('dir').toLowerCase();
    }
    else {
      currentDirection = ($(this).parent('[dir]').first().attr('dir')) ? $(this).parent('[dir]').first().attr('dir').toLowerCase() : currentDirection;
    }
    if(typeof textDirection[currentDirection] === 'undefined') {
      currentDirection = 'ltr';
    }
    oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
    var text = quail.getTextContents($(this));
    var matches = text.match(textDirection[oppositeDirection]);
    if(!matches) {
      return;
    }
    matches = matches.length;
    $(this).find('[dir=' + oppositeDirection + ']').each(function() {
      var childMatches = $(this).text().match(textDirection[oppositeDirection]);
      if(childMatches) {
        matches = matches - childMatches.length;
      }
    });
    if(matches > 0) {
      quail.testFails('languageDirAttributeIsUsed', $(this));
    }
  });
};