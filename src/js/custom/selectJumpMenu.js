quail.selectJumpMenu = function() {
  if(quail.html.find('select').length === 0) {
    return;
  }
  quail.loadHasEventListener();
  
  quail.html.find('select').each(function() {
    if(($(this).parent('form').find(':submit').length === 0 ) &&
       ($.hasEventListener($(this), 'change') ||
       $(this).attr('onchange'))) {
         quail.testFails('selectJumpMenu', $(this));
    }
  });
};
