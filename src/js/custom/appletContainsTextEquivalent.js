quail.appletContainsTextEquivalent = function() {
  quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
    if(quail.isUnreadable($(this).text())) {
      quail.testFails('appletContainsTextEquivalent', $(this));
    }
  });
};
