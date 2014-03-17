quail.aLinksDontOpenNewWindow = function() {
  quail.html.find('a[target=_new], a[target=_blank], a[target=_blank]').each(function() {
    var $link = $(this);
    for(var i = 0; i < quail.strings.newWindow.length; i++) {
      if(($link.text() + ' ' + $link.attr('title')).search(quail.strings.newWindow[i]) > -1) {
        return;
      }
    }
    quail.testFails('aLinksDontOpenNewWindow', $link);
  });
};