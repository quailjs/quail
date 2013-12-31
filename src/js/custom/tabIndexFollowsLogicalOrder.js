quail.tabIndexFollowsLogicalOrder = function() {
  var index = 0;
  quail.html.find('[tabindex]').each(function() {
    if(parseInt($(this).attr('tabindex'), 10) >= 0 &&
       parseInt($(this).attr('tabindex'), 10) !== index + 1) {
         quail.testFails('tabIndexFollowsLogicalOrder', $(this));
       }
    index++;
  });
};
