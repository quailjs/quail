quail.aSuspiciousLinkText = function() {
  var suspiciousText = quail.loadString('suspicious_links');
  quail.html.find('a').each(function() {
    var text = $(this).text();
    $(this).find('img[alt]').each(function() {
      text = text + $(this).attr('alt');
    });
    if(suspiciousText.indexOf(quail.cleanString(text)) > -1) {
      quail.testFails('aSuspiciousLinkText', $(this));
    }
  });
};
