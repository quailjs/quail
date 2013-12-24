quail.aSuspiciousLinkText = function() {
  quail.html.find('a').each(function() {
    var text = $(this).text();
    $(this).find('img[alt]').each(function() {
      text = text + $(this).attr('alt');
    });
    if(quail.strings.suspiciousLinks.indexOf(quail.cleanString(text)) > -1) {
      quail.testFails('aSuspiciousLinkText', $(this));
    }
  });
};
