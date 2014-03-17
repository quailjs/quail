quail.documentVisualListsAreMarkedUp = function() {
  var symbols = /(<br(\/)?>)(\s)(♦|›|»|‣|▶|.|◦|✓|◽|•|—|◾|\||\*|&bull;|&#8226;|[0-9].|\(?[0-9]\)|[\u25A0-\u25FF]|(?:[IXC][MD]|D?C{0,4}))/i;
  quail.html.find(quail.textSelector).each(function() {
    var $element = $(this);
    var matches = $element.html().match(symbols);
    if (matches && matches.length > 2) {
      quail.testFails('documentVisualListsAreMarkedUp', $element);
    }
  });
};
