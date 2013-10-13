quail.siteMap = function() {
  var mapString = quail.loadString('site_map');
  var set = true;
  quail.html.find('a').each(function() {
    var text = $(this).text().toLowerCase();
    $.each(mapString, function(index, string) {
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
