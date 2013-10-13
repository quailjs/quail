quail.aMustContainText = function() {
  quail.html.find('a').each(function() {
    if(!quail.containsReadableText($(this), true) && 
       !(($(this).attr('name') || $(this).attr('id')) && !$(this).attr('href'))) {
      quail.testFails('aMustContainText', $(this));
    }
  });
};
