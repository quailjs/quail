quail.documentTitleIsShort = function() {
  if(quail.html.find('head title:first').text().length > 150) {
    quail.testFails('documentTitleIsShort', quail.html.find('head title:first'));
  }
};
