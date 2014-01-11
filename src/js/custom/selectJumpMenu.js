quail.selectJumpMenu = function() {
  if(quail.html.find('select').length === 0) {
    return;
  }
  
  quail.html.find('select').each(function() {
    if($(this).parent('form').find(':submit').length === 0 &&
       quail.components.hasEventListener($(this), 'change')) {
         quail.testFails('selectJumpMenu', $(this));
    }
  });
};
