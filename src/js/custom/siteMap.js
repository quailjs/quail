quail.siteMap = function() {
  var set = true;
  quail.html.find('a').each(function() {
    var text = $(this).text().toLowerCase();
    $.each(quail.strings.siteMap, function(index, string) {
      if(text.search(string) > -1) {
        set = false;
        return;
      }
    });
    if(set === false) {
      return;
    }
  });
  if(set) {
    quail.testFails('siteMap', quail.html.find('body'));
  }
};
